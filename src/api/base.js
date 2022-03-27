import { create } from "axios";

export const request = create({
	baseURL: "http://localhost:5000",
});

