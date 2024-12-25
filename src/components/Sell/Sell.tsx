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
import { decreaseInventory } from './services/purchase.service';
import { getInventory } from '../Inventory/services/purchase.service';
import IInventory from '../Inventory/models/Inventory';
import { formatNumber } from '../../utils/functions/formatNumbers';
import sellReport from '../../utils/reports/sellReport';

const Sell = () => {
  // Cliente de consultas para la gestión de cache
  const queryClient = useQueryClient();

  const [error, setError] = useState({});
  const [dynamicCount, setDynamicCount] = useState<{ name: string; count: number }[]>([]);

  const [toast, setToast] = useState<IToast>({
    show: false,
    error: '',
    type: 'error',
  });

  const { data: inventoryInfo } = useQuery<IInventory[]>({
    queryKey: ['getInventory'],
    queryFn: async () => getInventory(),
    refetchOnWindowFocus: false, // Evita recargar datos al reenfocar la ventana
  });

  // Configuración de la mutación para agregar un usuario
  const decreaseInventoryMutation = useMutation({
    mutationFn: decreaseInventory,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['getCategories'] });

      sellReport({ row: variables, allInventory: inventoryInfo });

      reset({
        folio: '',
        enterprise_rut: '',
        enterprise_name: '',
        purchase_date: '',
        product: [{ product: '', count: 0, last_value: 0, category: '' }],
      });
    },
    onError: (error) => {
      setToast({
        ...toast,
        show: true,
        error: error.message ?? 'Ha ocurrido un error, comuniquese con el administrador.',
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

  const { fields, append } = useFieldArray({
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
      decreaseInventoryMutation.mutate(data);
    }
  };

  const inventoryData = useMemo(() => {
    return inventoryInfo?.map((inv) => {
      return {
        label: inv?.product,
        value: inv?.product,
      };
    });
  }, [inventoryInfo]);

  const getCount = (e: any) => {
    const { value, name } = e;
    const searcherElement = inventoryInfo?.find((inventory) => inventory.product === value);

    if (searcherElement) {
      // Crea un nuevo elemento con el nombre y la información encontrada
      const element = { name, count: searcherElement.count };

      // Actualiza el estado usando la función de actualización
      setDynamicCount((prev) => [...prev, element]);
    }
  };

  const showCount = (name: any): string => {
    const elements = dynamicCount?.filter((element) => element?.name === name).pop();

    return elements?.count !== undefined && elements?.count !== null
      ? 'Cantidad actual: ' + formatNumber(elements.count)
      : 'Ej: 12365';
  };

  return (
    <section className="w-full p-5">
      <section className="w-full px-2 md:px-6 text-xl text-gray-800 leading-normal">
        <section className="drop-shadow-md bg-white box-content box-border">
          <h1 className="font-bold break-normal text-blue-500 pt-6 pb-2 text-3xl md:text-4xl pl-5">Ventas</h1>
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
                  tittle="Fecha Venta"
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
              <div key={field.id} className="grid gap-6 grid-cols-3 mb-4">
                <div>
                  <Dropdown
                    control={control}
                    fields={inventoryData}
                    tittle="Productos"
                    name={`product.${index}.product`}
                    appearance="info"
                    onChangeFunction={getCount}
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    tittle="Cantidad"
                    name={`product.${index}.count`}
                    placeholders={showCount(`product.${index}.product`)}
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

export default Sell;