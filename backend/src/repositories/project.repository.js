/**
 * project.repository.js
 * What:  Database queries for student projects. Queries only, no rules.
 * Used by: services/project.service.js
 * Talks to: base.repository.js, models/project.model.js
 */
import {
  PROJECT_TABLE,
  PROJECT_SELECT,
  PROJECT_ORDER,
} from "../models/project.model.js";
import { findPage } from "./base.repository.js";

// Gets one page, optionally only one category. The category is passed as a parameter.
export function findProjects({ category, page, limit }) {
  return findPage({
    table: PROJECT_TABLE,
    select: PROJECT_SELECT,
    orderBy: PROJECT_ORDER,
    where: category ? "category = $1" : "",
    params: category ? [category] : [],
    page,
    limit,
  });
}
