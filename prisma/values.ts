export const sectores = [
    { id: "1", nome: "Pavilhoes", abreviacao: "PAV" },
    { id: "2", nome: "Edificio", abreviacao: "Edificio" }
];

export const salas = [
    { id: "1", designacao: "62", id_sector: "2" },
    { id: "2", designacao: "63", id_sector: "2" },
    { id: "3", designacao: "64", id_sector: "2" },
    { id: "4", designacao: "65", id_sector: "2" },
    { id: "5", designacao: "66", id_sector: "1" },
    { id: "6", designacao: "67", id_sector: "1" },
    { id: "7", designacao: "68", id_sector: "1" },
    { id: "8", designacao: "69", id_sector: "1" }
]

export const classes = [
    { id: "10", numero: 10, designacao: "10ª Classe" },
    { id: "11", numero: 11, designacao: "11ª Classe" },
    { id: "12", numero: 12, designacao: "12ª Classe" },
];

export const areasFormacao = [
    {
        id: "1",
        nome: "Construção Civil",
        abreviacao: "CON",
        cor_principal: "#111111",
        icone: "construcao_icon"
    },
    {
        id: "2",
        nome: "Electricidade",
        abreviacao: "ELE",
        cor_principal: "#222222",
        icone: "electricidade_icon"
    }
]
export const cursos = [
    {
        id: "1",
        nome: "Técnico de Obras de Construção Civil",
        codigo_curso: "CC",
        id_area_formacao: "1"
    },
    {
        id: "2",
        nome: "Desenhador Projectista",
        codigo_curso: "CP",
        id_area_formacao: "1"
    },
    {
        id: "3",
        nome: "Técnico de Electrónica Industrial e Automação",
        codigo_curso: "EA",
        id_area_formacao: "2"
    },
    {
        id: "4",
        nome: "Técnico de Energia e Instalações Eléctricas",
        codigo_curso: "EI",
        id_area_formacao: "2"
    },
    {
        id: "5",
        nome: "Técnico de Energias Renováveis",
        codigo_curso: "ER",
        id_area_formacao: "2"
    },
    {
        id: "6",
        nome: "Técnico de Electrónica e Telecomunicações",
        codigo_curso: "ET",
        id_area_formacao: "2"
    }
]

export const nomeTurmas = [
    {
        id: "7d1bc984-e53d-4be0-a4cf-c0d41d72a56f",
        id_curso: "1",
        id_classe: "10",
        //id_periodo: "1",
        turma: "A",
        designacao: "CC10A",
    },
    {
        id: "a1b3f7ab-35ed-46a1-bc3a-d13fa5b71e88",
        id_curso: "1",
        id_classe: "10",
        //id_periodo: "2",
        turma: "B",
        designacao: "CC10B",
    },
    {
        id: "b60f8be2-45c2-49f0-9f6e-0b69b7e81a87",
        id_curso: "1",
        id_classe: "10",
        //id_periodo: "C",
        turma: "C",
        designacao: "CC10C",
    },
    {
        id: "16b81e5d-5b9a-4652-91bc-b0130729f6b4",
        id_curso: "1",
        id_classe: "11",
        //id_periodo: "1",
        turma: "A",
        designacao: "CC11A",
    },
    {
        id: "62d41a2e-b6fa-49b1-8f69-e5e569c8b7c9",
        id_curso: "1",
        id_classe: "11",
        //id_periodo: "2",
        turma: "B",
        designacao: "CC11B",
    },
    {
        id: "7eeb7fa4-bc65-4c6c-90f3-d9a609c0ac12",
        id_curso: "1",
        id_classe: "11",
        //id_periodo: "C",
        turma: "C",
        designacao: "CC11C"
    },
    {
        id: "2c9e9234-3fc1-4859-a0c1-cf7720b4bde2",
        id_curso: "1",
        id_classe: "12",
        //id_periodo: "1",
        turma: "A",
        designacao: "CC12A",
    },
    {
        id: "48d2c03e-54e4-4b6b-88e9-3e89a912a57b",
        id_curso: "1",
        id_classe: "12",
        //id_periodo: "2",
        turma: "B",
        designacao: "CC12B",
    },
    {
        id: "0716a3b4-b5f2-4877-83f0-7a7304b9bb8f",
        id_curso: "2",
        id_classe: "10",
        //id_periodo: "1",
        turma: "A",
        designacao: "CP10A",
    
    },
    {
        id: "6b8d55ca-b20b-41fa-9673-ff3f1be48209",
        id_curso: "2",
        id_classe: "10",
        //id_periodo: "2",
        turma: "B",
        designacao: "CP10B",
    },
    {
        id: "d14eae6b-86be-4c3d-babf-b1fa69762e68",
        id_curso: "2",
        id_classe: "10",
        //id_periodo: "C",
        turma: "C",
        designacao: "CP10C",
    },
    {
        id: "e84342cd-88f1-4ec7-88fa-090de97b1c59",
        id_curso: "2",
        id_classe: "11",
        //id_periodo: "1",
        turma: "A",
        designacao: "CP11A",
    },
    {
        id: "4f36ab49-d8c5-4b6f-9019-bd97be6c7268",
        id_curso: "2",
        id_classe: "11",
        //id_periodo: "2",
        turma: "B",
        designacao: "CP11B",
    },
    {
        id: "3a089e53-d6b5-4c98-9294-3ed8f476f476",
        id_curso: "2",
        id_classe: "11",
        //id_periodo: "C",
        turma: "C",
        designacao: "CP11C",
    },
    {
        id: "2a3b2e45-4d1b-4160-b750-107b9bde544e",
        id_curso: "2",
        id_classe: "12",
        //id_periodo: "1",
        turma: "A",
        designacao: "CP12A",
    },
    {
        id: "9b8e4339-0fcb-441d-b63d-d6f2d978dbe1",
        id_curso: "2",
        id_classe: "12",
        //id_periodo: "2",
        turma: "B",
        designacao: "CP12B",
    },
    {
        id: "26cfc5ed-9cdb-4c99-9494-2401cfe55359",
        id_curso: "3",
        id_classe: "10",
        //id_periodo: "1",
        turma: "A",
        designacao: "EA10A",
    },
    {
        id: "5f42306c-b8ea-4c25-a2e4-d4976d84799c",
        id_curso: "3",
        id_classe: "10",
        //id_periodo: "2",
        designacao: "EA10B",
        turma: "B"
    },
    {
        id: "a3837f1e-6769-4931-8268-433b946c073f",
        id_curso: "3",
        id_classe: "10",
        //id_periodo: "C",
        turma: "C",
        designacao: "EA10C",
    },
    {
        id: "1139ab12-b1a3-44fa-846f-8a933edb67e4",
        id_curso: "3",
        id_classe: "11",
        //id_periodo: "1",
        turma: "A",
        designacao: "EA11A",
    },
    {
        id: "7d1bc984-e53d-4be0-a4cf-c0d41d72a56f",
        id_curso: "3",
        id_classe: "11",
        //id_periodo: "2",
        turma: "B",
        designacao: "EA11B",
    },
    {
        id: "8a715dbe-c9f7-456b-b929-85e4d9d530eb",
        id_curso: "3",
        id_classe: "11",
        //id_periodo: "C",
        turma: "C",
        designacao: "EA11C",
    },
    {
        id: "bcd2e61b-99fe-4c0d-9ee1-3fc71084b688",
        id_curso: "3",
        id_classe: "12",
        //id_periodo: "1",
        turma: "A",
        designacao: "EA12A",
    },
    {
        id: "c2a94a29-37e9-4821-b877-b67b62a205a5",
        id_curso: "3",
        id_classe: "12",
        //id_periodo: "2",
        turma: "B",
        designacao: "EA12B",
    },
    {
        id: "bc4bcde0-daf9-4fd5-9ca7-6fdb3f2f86ca",
        id_curso: "4",
        id_classe: "10",
        //id_periodo: "1",
        turma: "A",
        designacao: "EI10A",
    },
    {
        id: "f9b53c7c-53f7-49a0-bf36-f62d93c4c7c2",
        id_curso: "4",
        id_classe: "10",
        //id_periodo: "2",
        turma: "B",
        designacao: "EI10B",
    },
    {
        id: "f2c4c2c5-6b8f-47ff-95f9-f9707c5dbe93",
        id_curso: "4",
        id_classe: "10",
        //id_periodo: "C",
        turma: "C",
        designacao: "EI10C",
    },
    {
        id: "3e95d8cf-6d9d-478b-b8b2-26d424a42189",
        id_curso: "4",
        id_classe: "11",
        //id_periodo: "1",
        turma: "A",
        designacao: "EI11A",
    },
    {
        id: "f0b8c5db-bf4b-4fe9-bb52-6e9d0d99d153",
        id_curso: "4",
        id_classe: "11",
        //id_periodo: "2",
        turma: "B",
        designacao: "EI11B",
    },
    {
        id: "387ab8e4-32c5-46c1-9285-bd8ca567314f",
        id_curso: "4",
        id_classe: "11",
        //id_periodo: "C",
        turma: "C",
        designacao: "EI11C",
    },
    {
        id: "98d63a5c-d433-42d3-8b42-e1bc87b7f4d4",
        id_curso: "4",
        id_classe: "12",
        //id_periodo: "1",
        turma: "A",
        designacao: "EI12A",
    },
    {
        id: "cb5cfc3f-c6f0-4d02-a8b1-883da88f6fe4",
        id_curso: "4",
        id_classe: "12",
        //id_periodo: "2",
        turma: "B",
        designacao: "EI12B",
    },
    {
        id: "3f2a5422-b7e3-4c28-8b0f-b037df2c0b63",
        id_curso: "5",
        id_classe: "10",
        //id_periodo: "1",
        turma: "A",
        designacao: "ER10A",
    },
    {
        id: "9058d032-1185-4e29-8267-34a824fe8e9e",
        id_curso: "5",
        id_classe: "10",
        //id_periodo: "2",
        turma: "B",
        designacao: "ER10B",
    }
]
export const turmas = [
    {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        id_nome_turma: "7d1bc984-e53d-4be0-a4cf-c0d41d72a56f",
        id_periodo: "1",
        id_sala: "1",
        is_closed: false
    },
    {
        id: "84a1b574-b1b4-4b2a-a063-04a36ec7e102",
        id_nome_turma: "a1b3f7ab-35ed-46a1-bc3a-d13fa5b71e88",
        id_periodo: "1",
        id_sala: "2",
        is_closed: false
    },
    {
        id: "54818b78-f72b-4b09-b487-3ed567c6b9b0",
        id_nome_turma: "b60f8be2-45c2-49f0-9f6e-0b69b7e81a87",
        id_periodo: "1",
        id_sala: "3",
        is_closed: false
    },
    {
        id: "af45c67f-d8da-44d8-b080-7f31c2d5e5e3",
        id_nome_turma: "16b81e5d-5b9a-4652-91bc-b0130729f6b4",
        id_periodo: "1",
        id_sala: "4",
        is_closed: false
    },
    {
        id: "29cf1db7-5b7d-42c0-b9c4-80a47419b702",
        id_nome_turma: "62d41a2e-b6fa-49b1-8f69-e5e569c8b7c9",
        id_periodo: "1",
        id_sala: "5",
        is_closed: false
    },
]