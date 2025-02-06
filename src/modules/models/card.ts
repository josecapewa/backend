import { Cartao } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

class CardModel extends BaseModel<Cartao> {
    model = prisma.cartao;
    include = {};
}

export const cardModel = new CardModel();