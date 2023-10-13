import { useIonActionSheet, useIonAlert, useIonLoading } from "@ionic/react";
import { useEffect, useState } from "react";
import { UseFormReset } from "react-hook-form";
import useSWR from "swr";

import { infiteScrollData } from "@/helpers/infiniteScrollData";
import { useToast } from "@/hooks/useToast";
import {
  deleteStandProductRequest,
  getStandDetailsRequest,
  getStandProductsRequest,
  saveStandProductRequest,
  updateStandPostRequest,
  updateStandProductRequest,
} from "@/services";
import { TPagination } from "@/types/THttp";
import { TProduct, TProductForm } from "@/types/TProduct";
import { useBoolean } from "usehooks-ts";

const DEFAULT_LAST_INDEX_LIST = 0;
const DEFAULT_LIMIT_LIST = 10;

export const useStandProducts = (standID: string) => {
  const [presentAlert] = useIonAlert();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [present] = useIonActionSheet();
  const { toast, toastDismiss } = useToast();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [product, setProduct] = useState<TProduct>();
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLoadMoreProducts, setIsLoadMoreProducts] = useState(false);
  const [paginationProduct, setPaginationProduct] = useState<TPagination>({
    lastIndex: DEFAULT_LAST_INDEX_LIST,
    limit: DEFAULT_LIMIT_LIST,
    total: 0,
  });

  const { value: showModalProductForm, toggle: toggleModalProductForm } =
    useBoolean();

  const SWR_KEY_STANDS_DETAILS = `/stands/${standID}`;
  const SWR_KEY_STANDS_PRODUCTS = `/stands/${standID}/products`;

  const {
    data: stand,
    isLoading: isLoadingDetails,
    mutate: mutateDetails,
  } = useSWR(
    SWR_KEY_STANDS_DETAILS,
    async () => await getStandDetailsRequest(standID),
    {
      onError(error) {
        toastDismiss(SWR_KEY_STANDS_DETAILS);
        toast(error, { type: "error", toastId: SWR_KEY_STANDS_DETAILS });
      },
    }
  );

  const { isLoading: isLoadingProducts, mutate: mutateProducts } = useSWR(
    SWR_KEY_STANDS_PRODUCTS,
    async () => await getStandProductsRequest(standID, paginationProduct),
    {
      onSuccess(data) {
        if (data) {
          const newList =
            paginationProduct.lastIndex != 0
              ? infiteScrollData(
                  "id",
                  data.list,
                  data.pagination.lastIndex === DEFAULT_LAST_INDEX_LIST
                    ? []
                    : products
                )
              : data.list;

          setProducts(newList);
          setPaginationProduct(data.pagination);
          setIsLoadMoreProducts(false);
        }
      },
      onError(error) {
        toastDismiss(SWR_KEY_STANDS_PRODUCTS);
        toast(error, { type: "error", toastId: SWR_KEY_STANDS_PRODUCTS });
      },
    }
  );

  const handleSaveProduct = async (
    data: TProductForm,
    reset: UseFormReset<TProductForm>
  ) => {
    try {
      presentLoading();

      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("currency", data.currency);
      formData.append("price", data.price);
      if (data.type) formData.append("type", data.type);
      if (data.image) formData.append("image", data.image);

      await saveStandProductRequest(standID, formData);

      reset();

      toast("Producto guardado con éxito", { type: "success" });

      setPaginationProduct({
        lastIndex: DEFAULT_LAST_INDEX_LIST,
        limit: DEFAULT_LIMIT_LIST,
        total: 0,
      });

      setIsRefresh(true);

      toggleModalProductForm();
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      dismissLoading();
    }
  };

  const handleOpenModalNewProduct = () => {
    setProduct(undefined);
    toggleModalProductForm();
  };

  const handleOpenModalUpdateProduct = (product: TProduct) => {
    setProduct(product);
    toggleModalProductForm();
  };

  const handleUpdateProduct = async (
    data: TProductForm,
    reset: UseFormReset<TProductForm>
  ) => {
    try {
      if (data.id) {
        presentLoading();

        const formData = new FormData();

        console.log({ data });

        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("currency", data.currency);
        formData.append("price", data.price);
        if (data.type) formData.append("type", data.type);
        if (data.image) formData.append("image", data.image);

        await updateStandProductRequest(standID, data.id, formData);

        reset();

        toast("Producto editado con éxito", { type: "success" });

        setPaginationProduct({
          lastIndex: DEFAULT_LAST_INDEX_LIST,
          limit: DEFAULT_LIMIT_LIST,
          total: 0,
        });

        setIsRefresh(true);
        toggleModalProductForm();
      }
    } catch (error) {
      toast(error, { type: "error" });
    } finally {
      dismissLoading();
    }
  };

  const handleDeleteProduct = async (productID: string) => {
    presentAlert({
      header: "¿Estás seguro de eliminar permanentemente este producto?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Eliminar",
          role: "confirm",
          handler: async () => {
            try {
              presentLoading();

              await deleteStandProductRequest(standID, productID);

              setPaginationProduct({
                lastIndex: DEFAULT_LAST_INDEX_LIST,
                limit: DEFAULT_LIMIT_LIST,
                total: 0,
              });

              setIsRefresh(true);

              toast("Producto eliminado con éxito", { type: "success" });
            } catch (error) {
              toast(error, { type: "error" });
            } finally {
              dismissLoading();
            }
          },
        },
      ],
    });
  };

  const handleActions = (product: TProduct) => {
    present({
      header: "Actions",
      buttons: [
        {
          text: "Editar Producto",
          handler: () => handleOpenModalUpdateProduct(product),
        },
        {
          text: "Eliminar Product",
          handler: () => handleDeleteProduct(product.id),
        },
        {
          text: "Cancelar",
          cssClass: "danger-color",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
    });
  };

  const handleLoadAll = async () => {
    setPaginationProduct({
      lastIndex: DEFAULT_LAST_INDEX_LIST,
      limit: DEFAULT_LIMIT_LIST,
      total: 0,
    });
    setIsRefresh(true);
  };

  const handleLoadMoreProducts = async () => {
    setIsLoadMoreProducts(true);
    mutateProducts();
  };

  useEffect(() => {
    if (isRefresh) {
      mutateDetails();
      mutateProducts();
      setIsRefresh(false);
    }
  }, [isRefresh]);

  return {
    stand,
    products,
    product,
    isLoading: isLoadingDetails || isLoadingProducts,
    isLoadMoreProducts,
    showModalProductForm,
    showLoadMoreProductsBtn:
      paginationProduct.total > DEFAULT_LIMIT_LIST &&
      products.length !== paginationProduct.total,
    handleLoadAll,
    handleActions,
    handleLoadMoreProducts,
    handleSaveProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleLoadDetails: mutateDetails,
    handleOpenModalNewProduct,
    handleOpenModalUpdateProduct,
    toggleModalProductForm,
  };
};
