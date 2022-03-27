const { contextBridge, ipcRenderer } = require("electron");
const path = require("path");
const { createModelProxy } = require("./create-proxy");

const dbProductionPath = path.join(
  __dirname
  , '../../../static/aidy.sqlite3'
)

const dbPath = path.join(
  __dirname,
  './db.sqlite3'
)

const knex = require('knex')({
  client: 'sqlite3',
  useNullAsDefault: true,
  searchPath: ['knex', 'public'],
  connection: {
    filename: dbPath 
  }
});

const bookshelf = require('bookshelf')(knex);

const runRawSQL = async (sql) => {
  const result = await bookshelf.knex.raw(sql);
  return result;
}

const Categories = bookshelf.model('Categories', {
  tableName: 'categories'
});

const Suppliers = bookshelf.model('Suppliers', {
  tableName: 'suppliers',
  products() {
    return this.hasMany('Products')
  }
})

const Products = bookshelf.model('Products', {
  tableName: 'products',
  images() {
    return this.belongsToMany('Images')
  },
  category() {
    return this.belongsTo('Categories')
  },
  supplier(){
    return this.belongsTo('Suppliers')
  },
  ingredients() {
    return this.belongsToMany('Ingredients')
  }
});

const Ingredients = bookshelf.model('Ingredients',{
  tableName: 'ingredients',
})

const Clients = bookshelf.model('Clients', {
  tableName: 'clients'
})

// const Images = bookshelf.model('Images', {
//   tableName: 'images',
//   products() {
//     return this.belongsToMany('Products')
//   }
// });

const Tickets = bookshelf.model('Tickets', {
  tableName: 'tickets',
  bill() {
    return this.belongsTo('Bills')
  }
});

const StockMovements = bookshelf.model('StockMovements', {
  tableName: 'stock_movements',
  bill() {
    return this.belongsTo('Bill')
  }
})

const Bills = bookshelf.model('Bills', {
  tableName: 'bills',
  client() {
    return this.belongsTo('Clients')
  },
  history() {
    return this.hasMany('StockMovements')
  },
  ticket() {
    return this.hasOne('Tickets')
  }
})

const Users = bookshelf.model('Users', {
  tableName: 'users'
});

const Transports = bookshelf.model('Transports', {
  tableName: 'transports'
});

contextBridge.exposeInMainWorld("bookshelf", {
  users: createModelProxy(Users),
  products: createModelProxy(Products),
  categories: createModelProxy(Categories),
  clients: createModelProxy(Clients),
  tickets: createModelProxy(Tickets),
  bills: createModelProxy(Bills),
  stockMovements: createModelProxy(StockMovements),
  // images: createModelProxy(Images),
  suppliers: createModelProxy(Suppliers),
  transports: createModelProxy(Transports),
  ingredients: createModelProxy(Ingredients),

  
  runRawSQL: runRawSQL
});
contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: ipcRenderer
});