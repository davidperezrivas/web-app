import { useMemo, useState } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import Button from '../../storybook/components/Button/Button';
import Toast from '../../storybook/components/Toast/Toast';
import Input from '../../storybook/components/Input/Input';
import Dropdown from '../../storybook/components/Dropdown/Dropdown';
import SaveIcon from '../../storybook/icons/save';
import { Inputs } from './models';
import { IToast } from '../../storybook/components/Toast/interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CategoryModel from '../Category/models/Category';
import { getAllCategories } from '../Category/services/category.service';
import { increaseInventory } from './services/purchase.service';

const Purchase = () => {
  // Cliente de consultas para la gestión de cache
  const queryClient = useQueryClient();

  const [error, setError] = useState({});
  const [toast, setToast] = useState<IToast>({
    show: false,
    error: '',
    type: 'error',
  });

  const { data } = useQuery<CategoryModel[]>({
    queryKey: ['getCategories'],
    queryFn: async () => getAllCategories(),
    refetchOnWindowFocus: false, // Evita recargar datos al reenfocar la ventana
  });

  // Configuración de la mutación para agregar un usuario
  const addCategoryMutation = useMutation({
    mutationFn: increaseInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCategories'] });
      reset({
        folio: '',
        enterprise_rut: '',
        enterprise_name: '',
        purchase_date: '',
        product: [{ product: '', count: 0, last_value: 0, category: '' }],
      });
    },
    onError: () => {
      setToast({
        ...toast,
        show: true,
        error: 'Ha ocurrido un error, comuniquese con el administrador.',
      });
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setError: setFormError,
    setValue,
    getValues,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      folio: '',
      enterprise_rut: '',
      enterprise_name: '',
      purchase_date: '',
      product: [{ product: '', count: 0, last_value: 0, category: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'product',
  });

  const formValidations = (formData: Inputs): boolean => {
    setError({});
    let localErrors = {};

    if (formData.enterprise_name === '') {
      localErrors = { ...localErrors, enterprise_name: 'Proveedor es requerido' };
    }
    if (formData.enterprise_rut === '') {
      localErrors = { ...localErrors, enterprise_rut: 'Rut Empresa es requerido' };
    }
    if (formData.folio === '') {
      localErrors = { ...localErrors, folio: 'Folio Factura es requerido' };
    }
    if (formData.purchase_date === '') {
      localErrors = { ...localErrors, purchase_date: 'Fecha de Compra es requerida' };
    }

    Object.entries(localErrors).forEach(([key, value]) => {
      setFormError(key as keyof Inputs, { type: 'manual', message: value as string });
    });

    setError(localErrors);

    return Object.keys(localErrors).length === 0;
  };

  const handleRemove = (index: number) => {
    if (getValues('product').length > 1) {
      const currentValues = getValues('product'); // Obtén los valores actuales
      const updatedValues = currentValues.filter((_, i) => i !== index); // Filtra el elemento eliminado
      setValue('product', updatedValues);
    } // Actualiza los valores
  };

  const handleAppend = () => {
    append({ product: '', count: 0, last_value: 0, category: '' });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const isValid = formValidations(data);

    if (isValid) {
      addCategoryMutation.mutate(data);
    }
  };

  const categoryData = useMemo(() => {
    return data?.map((category) => {
      return {
        label: category?.name,
        value: category?.id,
      };
    });
  }, [data]);
  return (
    <section className="w-full p-5">
      <section className="w-full px-2 md:px-6 text-xl text-gray-800 leading-normal">
        <section className="drop-shadow-md bg-white box-content box-border">
          <h1 className="font-bold break-normal text-blue-500 pt-6 pb-2 text-3xl md:text-4xl pl-5">Compras</h1>
          {toast.show ? <Toast text={toast.error} type={toast.type} /> : null}
        </section>

        <section className="drop-shadow-md bg-white box-content box-border min-h-32 px-2 md:px-14 py-10">
          <form className="p-4" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            {/* Campos generales */}
            <div className="grid gap-6 grid-cols-4 mb-4">
              <div>
                <Input
                  type="text"
                  tittle="Proveedor"
                  name="enterprise_name"
                  placeholders="ej: Servitek"
                  register={register}
                  appearance={error.hasOwnProperty('enterprise_name') ? 'error' : 'info'}
                  error={error}
                />
              </div>
              <div>
                <Input
                  type="text"
                  tittle="Rut Empresa"
                  name="enterprise_rut"
                  placeholders="ej: 99999999-9"
                  register={register}
                  appearance={error.hasOwnProperty('enterprise_rut') ? 'error' : 'info'}
                  error={error}
                />
              </div>
              <div>
                <Input
                  type="text"
                  tittle="Folio Factura"
                  name="folio"
                  placeholders="ej: 999"
                  register={register}
                  appearance={error.hasOwnProperty('folio') ? 'error' : 'info'}
                  error={error}
                />
              </div>
              <div>
                <Input
                  type="date"
                  tittle="Fecha Compra"
                  name="purchase_date"
                  placeholders=""
                  register={register}
                  appearance={error.hasOwnProperty('purchase_date') ? 'error' : 'info'}
                  error={error}
                />
              </div>
            </div>

            {/* Sección dinámica de productos */}
            {fields.map((field, index) => (
              <div key={field.id} className="grid gap-6 grid-cols-5 mb-4">
                <div>
                  <Input
                    type="text"
                    tittle="Producto"
                    name={`product.${index}.product`}
                    placeholders="ej: 153"
                    appearance="info"
                    register={register}
                  />
                </div>
                <div>
                  <Dropdown
                    control={control}
                    fields={categoryData}
                    tittle="Categoria"
                    name={`product.${index}.category`}
                    appearance="info"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    tittle="Cantidad"
                    name={`product.${index}.count`}
                    placeholders="ej: 153"
                    appearance="info"
                    register={register}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    tittle="Valor"
                    name={`product.${index}.last_value`}
                    placeholders="ej: 153"
                    appearance="info"
                    register={register}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <Button text="Eliminar" type="button" status="error" onClick={() => handleRemove(index)} />

                  {fields.length === index + 1 && (
                    <Button text="Agregar Producto" type="button" status="info" onClick={() => handleAppend()} />
                  )}
                </div>
              </div>
            ))}

            <section className="flex justify-end pb-4">
              <Button text="Guardar" type="submit" icon={<SaveIcon />} status="info" />
            </section>
          </form>
        </section>
      </section>
    </section>
  );
};

export default Purchase;