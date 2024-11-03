import * as Yup from "yup";

export const validationSchemaProducto = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio"),
  descripcion: Yup.string().required("La descripción es obligatoria"),
  categoria: Yup.string().required("Seleccione una categoría"),
  unidad: Yup.string().required("Seleccione una unidad"),
  precio_lista: Yup.number()
    .required("El precio es obligatorio")
    .positive("El precio debe ser mayor a 0"),
  precio_mayorista: Yup.number()
    .required("El precio es obligatorio")
    .positive("El precio debe ser mayor a 0"),
  cantidad_disponible: Yup.number()
    .required("La cantidad es obligatoria")
    .positive("La cantidad debe ser mayor a 0"),
});