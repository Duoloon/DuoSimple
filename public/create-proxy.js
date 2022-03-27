
const parseModel = (model) => {
    const relations = Object
        .entries(model.relations)
        .reduce( (result, [key,value] ) => {
            const relationValue = value.attributes 
                ? {...value.attributes}
                : value.models.map( model => model.attributes )
            return {
                ...result,
                [key]: relationValue
            }
        } , {});
    return {
        ...model.attributes,
        ...relations
    }
}

const createModelProxy = (model) => {
    return {
        create: async ({ data, relations, include }) => {
            let result = await model.forge(data).save();
            let relationsPromises = {};
            let relationsIncluded = [ ...( include ? [...Object.keys(include)] : [] ) ];
            if(relations) {
                Object.entries(relations).forEach( ([key,value]) => {
                    relationsIncluded.push( key );
                    if( Array.isArray(value) ){
                        relationsPromises[key] = value.map( v => result[key]().create(v) )
                    }else {
                        relationsPromises[key] = result[key]().create(value);
                    }
                })
                const promises = Object.entries(relationsPromises);
                for( let i = 0; i < promises.length; i++ ){
                    const [ key, value ] = promises[i];
                    if( Array.isArray(value)){
                        relationsPromises[key] = await Promise.all(value)
                    }else {
                        relationsPromises[key] = await value;
                    }

                }
            }
            result = await result.fetch({
                withRelated: relationsIncluded
            });
            return parseModel(result);
        }, 
        upsertMany: async ({ data }) => {
            let newData = [];
            for( const d of data ){
                const result = await model.where({ name: d.name }).fetchAll();
                if( result.length ){
                    let modelToUpdate = await new model({
                        id: result.models[0].attributes.id
                    }).fetch();
                    let modelUpdated = await modelToUpdate.save(d ,{
                        patch: true
                    });
                    newData.push( parseModel(modelUpdated) );
                }else {
                    model.forge([d]);
                    const res = await model.collection(d).invokeThen('save');
                    newData.push( parseModel(res[0]) );
                }
            }
            return newData;
        }, 
        createMany: async ({ data }) => {
            model.forge( data.map( ({data}) => data ) );
            const res = await model.collection( data.map( ({data}) => data ) ).invokeThen('save');
            const newModelsPromises = res.map( async (result,index) => {
                const { relations, include } = data[index];
                let relationsIncluded = [ ...( include ? [...Object.keys(include)] : [] ) ];
                if(relations) {
                    Object.entries(relations).forEach( ([key,value]) => {
                        relationsIncluded.push( key );
                        if( Array.isArray(value) ){
                            relationsPromises[key] = value.map( v => result[key]().create(v) )
                        }else {
                            relationsPromises[key] = result[key]().create(value);
                        }
                    })
                    const promises = Object.entries(relationsPromises);
                    for( let i = 0; i < promises.length; i++ ){
                        const [ key, value ] = promises[i];
                        if( Array.isArray(value)){
                            relationsPromises[key] = await Promise.all(value)
                        }else {
                            relationsPromises[key] = await value;
                        }
                    }
                }
                let refreshedResult = await result.fetch({
                    withRelated: relationsIncluded
                });
                return parseModel(refreshedResult);
            });
            const newModels = await Promise.all(newModelsPromises);
            return newModels;
        },
        update: async ({ data, where, include }) => {
            if(!where){
                throw new Error("Update method requires property 'where'")
            }
            try{
                const relationsIncluded = [ ...( include ? [...Object.keys(include)] : [] ) ];
                const modelToUpdate = await new model(where).fetch(where);
                const result = await modelToUpdate.save(data,{
                    patch: true
                }).then( res => res.fetch({
                    withRelated: relationsIncluded
                }))
                return parseModel(result);
            }catch(err){
                console.log(err);
                console.log('error');
            }
        },
        delete: async ({ where }) => {
            if(!where){
                throw new Error('delete method requires "where" property');
            }
            try{
                const modelToDelete = await new model(where).fetch();
                await modelToDelete.destroy();
                return true;
            }catch(err){
                console.log(err)
            }

        },
        findMany: async (params) => {
            const { where , withRelated, ...rest } = params ?? {};
            if(where){
              const result = await model.where(where).fetchAll({ 
                withRelated: withRelated ?? [],
                ...rest
              });
              return result.models.map( model => parseModel(model) );
            }else{
              const result = await model.fetchAll({ 
                withRelated: withRelated ?? [],
                ...rest
              });
              return result.models.map( model => parseModel(model) );
            }
        }
    }
}

module.exports = {
    createModelProxy
};