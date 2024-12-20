import React, { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { AnimatePresence, motion } from "framer-motion"
import { Producto } from "../page"



interface iProps {
  setOpen: (open: boolean) => void,
  productos: Producto[],
  onAddToCart: (product: Producto, quantity: number) => void
}

export const ModalContent = ({ setOpen, productos, onAddToCart }: iProps) => {
  const [producto, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState<string>("");
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("todos");
  const [precioFiltro, setPrecioFiltro] = useState<number>(0);
  const [validateCategory, setValidateCategory] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [currentQuantity, setCurrentQuantity] = useState<number>(1);

  const validationSchema = Yup.object().shape({
    quantity: Yup.number()
      .min(1, "La cantidad debe ser al menos 1")
      .max(selectedProduct?.cantidad_disponible || 0, `La cantidad no puede ser mayor a ${selectedProduct?.cantidad_disponible}`)
      .required("La cantidad es requerida")
  });

  useEffect(() => {
    setProductos(productos)
  }, [productos]);

  const productosFiltrados = productos.filter((producto) => {
    return (
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (categoriaFiltro === "todos" || producto.categoria === categoriaFiltro) &&
      producto.precio_lista >= precioFiltro
    );
  });

  const getDisplayPrice = (product: Producto, quantity: number) => {
    const threshold = product.unidad === 'kg' ? 3 : 3;
    return quantity >= threshold ? product.precio_mayorista : product.precio_lista;
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Agregar al carrito</h2>
        <button 
          onClick={() => setOpen(false)} 
          className="text-gray-500 hover:text-gray-700"
          aria-label="Cerrar"
        >
          x
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="border p-2 rounded-md w-full sm:w-auto"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          aria-label="Buscar por nombre"
        />
        <select
          className="border p-2 rounded-md w-full sm:w-auto"
          value={categoriaFiltro}
          onChange={(e) => {
            setCategoriaFiltro(e.target.value)
            setValidateCategory(true);
          }}
          aria-label="Filtrar por categoría"
        >
          <option value="todos">Todas las categorías</option>
          <option value="panificacion">Panificación</option>
          <option value="pasteleria">Pastelería</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <AnimatePresence>
          {(busqueda.length || precioFiltro || validateCategory) ?
            productosFiltrados.map(product => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={`p-4 border rounded-lg cursor-pointer ${selectedProduct?.id === product.id ? 'border-blue-500' : 'border-gray-200'}`}
                onClick={() => {
                  setSelectedProduct(product);
                  setCurrentQuantity(1);
                }}
              >
                <h3 className="font-semibold">{product.nombre}</h3>
                <p className="text-gray-600">
                  Precio: ${getDisplayPrice(product, 1)}
                  {product.precio_lista !== product.precio_mayorista && (
                    <span className="text-sm text-gray-500 ml-2">
                      (Mayorista: ${product.precio_mayorista})
                    </span>
                  )}
                </p>
              </motion.div>
            )) : null
          }
        </AnimatePresence>
      </div>
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-gray-100 rounded-lg"
        >
          <Formik
            initialValues={{ quantity: 1 }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              onAddToCart(selectedProduct, values.quantity)
              setSubmitting(false)
              setOpen(false)
            }}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <div className="mb-4">
                  <p className="font-semibold mb-2">Producto: {selectedProduct.nombre}</p>
                  <p className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad disponible {selectedProduct.unidad}: {selectedProduct.cantidad_disponible}
                  </p>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad:
                  </label>
                  <Field
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    max={selectedProduct.cantidad_disponible}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newQuantity = parseInt(e.target.value, 10);
                      setFieldValue("quantity", newQuantity);
                      setCurrentQuantity(newQuantity);
                    }}
                  />
                  <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <p className="text-lg font-semibold mb-4">
                  Precio: ${getDisplayPrice(selectedProduct, values.quantity)}
                  {selectedProduct.precio_lista !== selectedProduct.precio_mayorista && (
                    <span className="text-sm text-gray-500 ml-2">
                      {values.quantity >= (selectedProduct.unidad === 'kg' ? 3 : 3) ? '(Precio mayorista)' : ''}
                    </span>
                  )}
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    type="submit"
                    disabled={isSubmitting || !selectedProduct.cantidad_disponible}
                    className="px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    Agregar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </motion.div>
      )}
    </div>
  )
}