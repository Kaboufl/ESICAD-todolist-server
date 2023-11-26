import { Router } from "express";
import { query } from "./db";

const router = Router();

const getCategories = async (): Promise<any> => {
  return await query("SELECT * FROM categorie");
};

router.get("/", async (req, res) => {
  const categories = await getCategories();
  console.table(categories);
  return res.status(200).json(categories);
});

router.post("/", async (req, res) => {
  const newCategory = req.body;
  const lastCategoryId = await query("SELECT MAX(id) as maxId FROM categorie");
  await query(
    `INSERT INTO categorie (libelle, hex_color) VALUES ('${String(
      newCategory.libelle
    )}', '${String(newCategory.hex_color)}')`
  );
  newCategory.id = lastCategoryId[0].maxId + 1;
  console.log(newCategory);
  return res.status(200).json(newCategory);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  console.log(`delete "/categories/:id" called`, id);
  await query(`DELETE FROM categorie WHERE id = ${id}`);
  return res.status(200).json({ status: "OK" });
});

export default router;
