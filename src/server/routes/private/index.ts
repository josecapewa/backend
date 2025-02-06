import { FastifyInstance } from "fastify";
import { students } from "./student.routes";
import { periods } from "./period.routes";
import { turns } from "./turn.routes";
import { levels } from "./level.routes";
import { importAllStudent } from "./import_all_student.routes";
import { sectors } from "./sector.routes";
import { rooms } from "./room.routes";
import { importShortStudent } from "./import_short_student.routes";
import { curriculumPlans } from "./curriculum_plan.routes";
import { disciplineTypes } from "./discipline_type.routes";
import { disciplines } from "./discipline.routes";
import { grades } from "./grade.routes";
import { courses } from "./course.routes";
import { trainingFields } from "./training_field.routes";
import { classes } from "./class.routes";
import { identificationTypes } from "./identification_type.routes";
import { trimesters } from "./trimester.routes";
import { roles } from "./role.routes";
import { employees } from "./employee.routes";
import { authService } from "../../../modules/services/auth";
import { statistic } from "./statistics_rupes.routes";
import { listStudent } from "./list_student.routes";
import { SheetInformation } from "./list_information.routes";
import { rupes } from "./rupes.routes";
import { tipoRupe } from "./tipo_rupe.routes";
import { importMinipautas } from "./import_minipauta.routes";
import { studentInClasses } from "./student_in_class.routes";
import { classNames } from "./class_names.routes";
import { cycles } from "./cycle.routes";
import { disciplineCurriculumPlans } from "./discipline_curriculum_plan.routes";
import { gradeWorkloads } from "./grade_workload.routes";
import { cardModels } from "./card_model.routes";
import { studentCards } from "./student_card.routes";
import { cardFiles } from "./card_file.routes";
import { fileTypes } from "./file_type.routes";
import { ImportTeacher } from "./import_teachear.routes";
import { importRupes } from "./import_rupes.routes";
import { miniPautas } from "./mini_pauta.routes";
import { academicCallFiles } from "./academic_call_file.routes";
import { statistics } from "./statistic.routes";
import { agendas } from "./agenda.routes";

import { personEmails } from "./person_email.routes";
import { person } from "./person.routes";
import { users } from "./user.routes";

import { categories } from "./category.routes";
import { laborRegimes } from "./labor_regime.routes";
import { teachers } from "./teacher.routes";
import { teachersCategories } from "./teacher_category.routes";
import { pedagogicalRoles } from "./pedagogical_role.routes";
import { literaryQualifications } from "./literaly_qualification.routes";
import { messages } from "./message.routes";
import { classDirectors } from "./class_director.routes";
import { specialExams } from "./special_exams.routes";

/**
 * Registers private routes for the Fastify application.
 *
 * This function sets up various routes that require authentication and are intended for private access.
 * It registers a pre-handler hook for authentication and defines several routes related to students,
 * periods, classes, and other educational entities.
 *
 * @param {FastifyInstance} app - The Fastify instance to register the private routes on.
 *
 * @returns {Promise<void>} A promise that resolves when the routes have been successfully registered.
 *
 * @throws {Error} Throws an error if the registration of any route fails.
 *
 * @example
 * import fastify from 'fastify';
 * import privateRoutes from './path/to/privateRoutes';
 *
 * const app = fastify();
 * privateRoutes(app).then(() => {
 *   console.log('Private routes registered successfully');
 * }).catch(err => {
 *   console.error('Error registering private routes:', err);
 * });
 */
export default async function privateRoutes(app: FastifyInstance) {
  app.register(async (privateApp) => {
    privateApp.addHook("preHandler", authService.authenticate);
    privateApp.delete("/logout", authService.logout);
    await students(privateApp);
    await periods(privateApp);
    await classes(privateApp);
    await trainingFields(privateApp);
    await courses(privateApp);
    await grades(privateApp);
    await disciplines(privateApp);
    await disciplineTypes(privateApp);
    await curriculumPlans(privateApp);
    await importShortStudent(privateApp);
    await rooms(privateApp);
    await rupes(privateApp);
    await sectors(privateApp);
    await ImportTeacher(privateApp);
    await importAllStudent(privateApp);
    await importRupes(privateApp);
    await levels(privateApp);
    await turns(privateApp);
    await identificationTypes(privateApp);
    await trimesters(privateApp);
    await roles(privateApp);
    await employees(privateApp);
    await statistic(privateApp);
    await listStudent(privateApp);
    await SheetInformation(privateApp);
    await tipoRupe(privateApp);
    await importMinipautas(privateApp);
    await studentInClasses(privateApp);
    await classNames(privateApp);
    await cycles(privateApp);
    await disciplineCurriculumPlans(privateApp);
    await gradeWorkloads(privateApp);
    await cardModels(privateApp);
    await miniPautas(privateApp);
    await studentCards(privateApp);
    await cardFiles(privateApp);
    await fileTypes(privateApp);
    await academicCallFiles(privateApp);
    await statistics(privateApp);
    await agendas(privateApp);
    await messages(privateApp);
    await personEmails(privateApp);
    await person(privateApp);
    await users(privateApp);
    await literaryQualifications(privateApp);
    await categories(privateApp);
    await laborRegimes(privateApp);
    await teachers(privateApp);
    await teachersCategories(privateApp);
    await pedagogicalRoles(privateApp);
    await classDirectors(privateApp);
    await specialExams(privateApp);
  });
}
