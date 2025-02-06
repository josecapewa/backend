import { PlanoCurricular } from "@prisma/client";

type TCurriculumPlanGetAllParams = TBaseGetAllParams & {
    filter?: string;
    course: string;
    lective_year?: string;
};

type Classe = {
    id: string;
    numero: number;
    designacao: string | null;
    id_disciplina_carga_horaria: string;
    cargaHoraria: number;
};

type Disciplina = {
    id: string;
    nome: string;
    classes: Classe[];
};

type TipoDisciplina = {
    tipoDisciplina: string;
    disciplinas: Disciplina[];
    totalCargaHoraria: number;
};

type PlanoCurricularExpandido = PlanoCurricular & {
    curso: {
        id: string;
        nome: string;
        codigo_curso: string;
    };
    disciplina_carga_horaria: {
        id: string;
        carga_horaria: number;
        disciplina: {
            id: string;
            nome: string;
            tipo_disciplina: {
                tipo_disciplina: string;
            };
        };
        classe: {
            id: string;
            numero: number;
            designacao: string | null;
        };
    }[];
};