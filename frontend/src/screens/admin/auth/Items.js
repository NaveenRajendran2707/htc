import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { confirmAlert } from "react-confirm-alert";
import { useForm } from "react-hook-form";
import useItemsHook from "../../../api/items";
import useBranchesHook from "../../../api/branches";
import useItemGroupsHook from "../../../api/itemGroups";
import useCategoriesHook from "../../../api/categories";
import useUnitConversionsHook from "../../../api/unitConversions";
import useHSNsHook from "../../../api/hsns";
import useGSTTaxesHook from "../../../api/gstTaxes";
import {
  Spinner,
  ViewItems,
  Pagination,
  FormItems,
  Message,
  Confirm,
} from "../../../components";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

const Items = () => {
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [q, setQ] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getItems, postItem, updateItem, deleteItem } = useItemsHook({
    page,
    q,
  });

  const { getBranches } = useBranchesHook({
    page,
    q,
  });

  const { getItemGroups } = useItemGroupsHook({
    page,
    q,
  });

  const { getCategories } = useCategoriesHook({
    page,
    q,
  });

  const { getUnitConversions } = useUnitConversionsHook({
    page,
    q,
  });

  const { getHSNs } = useHSNsHook({
    page,
    q,
  });

  const { getGSTTaxes } = useGSTTaxesHook({
    page,
    q,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const { data: getBranchName } = getBranches;
  const { data: getItemGroup } = getItemGroups;
  const { data: getCategory } = getCategories;
  const { data: getUom } = getUnitConversions;
  const { data: getHSNcode } = getHSNs;
  const { data: getGST } = getGSTTaxes;

  const { data, isLoading, isError, error, refetch } = getItems;

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateItem;

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteItem;

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postItem;

  const formCleanHandler = () => {
    setEdit(false);
    reset();
  };

  useEffect(() => {
    if (isSuccessPost || isSuccessUpdate) formCleanHandler();
  }, [isSuccessPost, isSuccessUpdate]);

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (!q) refetch();
  }, [q]);

  const searchHandler = (e) => {
    e.preventDefault();
    refetch();
    setPage(1);
  };

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => mutateAsyncDelete(id)));
  };

  const submitHandler = (data) => {
    edit
      ? mutateAsyncUpdate({
          _id: id,
          itemSerialNo: data.itemSerialNo,
          branchName: data.branchName,
          groupName: data.groupName,
          productCategory: data.productCategory,
          name: data.name,
          aliasName: data.aliasName,
          uom: data.uom,
          cost: data.cost,
          listPrice: data.listPrice,
          discount: data.discount,
          marginPrice: data.marginPrice,
          MRP: data.MRP,
          batchNo: data.batchNo,
          expiryDate: data.expiryDate,
          freeGiftQty: data.freeGiftQty,
          HSNCode: data.HSNCode,
          GSTTaxRate: data.GSTTaxRate,
          reOrderQty: data.reOrderQty,
          openingStockQty: data.openingStockQty,
          openingStockValue: data.openingStockValue,
          productImage: data.productImage,
          blocked: data.blocked,
        })
      : mutateAsyncPost(data);
  };

  const viewHandler = (item) => {
    setId(item._id);
    setView(true);
    setValue("itemSerialNo", item.itemSerialNo);
    setValue("branchName", item.branchName);
    setValue("groupName", item.groupName);
    setValue("productCategory", item.productCategory);
    setValue("name", item.name);
    setValue("aliasName", item.aliasName);
    setValue("uom", item.uom);
    setValue("cost", item.cost);
    setValue("listPrice", item.listPrice);
    setValue("discount", item.discount);
    setValue("marginPrice", item.marginPrice);
    setValue("MRP", item.MRP);
    setValue("batchNo", item.batchNo);
    setValue("expiryDate", item.expiryDate);
    setValue("freeGiftQty", item.freeGiftQty);
    setValue("HSNCode", item.HSNCode);
    setValue("GSTTaxRate", item.GSTTaxRate);
    setValue("reOrderQty", item.reOrderQty);
    setValue("openingStockQty", item.openingStockQty);
    setValue("openingStockValue", item.openingStockValue);
    setValue("productImage", item.productImage);
    setValue("blocked", item.blocked);
  };

  const editHandler = (item) => {
    setId(item._id);
    setView(false);
    setEdit(true);
    setValue("itemSerialNo", item.itemSerialNo);
    setValue("branchName", item.branchName);
    setValue("groupName", item.groupName);
    setValue("productCategory", item.productCategory);
    setValue("name", item.name);
    setValue("aliasName", item.aliasName);
    setValue("uom", item.uom);
    setValue("cost", item.cost);
    setValue("listPrice", item.listPrice);
    setValue("discount", item.discount);
    setValue("marginPrice", item.marginPrice);
    setValue("MRP", item.MRP);
    setValue("batchNo", item.batchNo);
    setValue("expiryDate", item.expiryDate);
    setValue("freeGiftQty", item.freeGiftQty);
    setValue("HSNCode", item.HSNCode);
    setValue("GSTTaxRate", item.GSTTaxRate);
    setValue("reOrderQty", item.reOrderQty);
    setValue("openingStockQty", item.openingStockQty);
    setValue("openingStockValue", item.openingStockValue);
    setValue("productImage", item.productImage);
    setValue("blocked", item.blocked);
  };

  return (
    <>
      <Helmet>
        <title>Items | HTC</title>
        <meta property="og:title" content="Items" key="title" />
      </Helmet>
      {isSuccessDelete && (
        <Message variant="success">Item has been deleted successfully.</Message>
      )}
      {isErrorDelete && <Message variant="danger">{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant="success">Item has been updated successfully.</Message>
      )}
      {isErrorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant="success">Item has been Created successfully.</Message>
      )}
      {isErrorPost && <Message variant="danger">{errorPost}</Message>}

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ViewItems
          data={data}
          viewHandler={viewHandler}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          isLoadingDelete={isLoadingDelete}
          setQ={setQ}
          q={q}
          searchHandler={searchHandler}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setView={setView}
        />
      )}

      <div className="ms-auto text-end">
        <Pagination data={data} setPage={setPage} />
      </div>

      <Dialog
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        transition
        className="realtive z-[1000] transition duration-100 ease-linear data-[closed]:opacity-0"
      >
        <div className="fixed z-[1000] inset-0 flex w-screen justify-center items-center p-2">
          <DialogPanel className="max-w-[800px] w-full flex flex-col rounded-xl shadow-sm bg-white">
            <DialogTitle
              className="flex justify-between items-center p-3"
              as="div"
            >
              <h3 className="text-2xl font-bold">
                {edit ? "Edit Item" : view ? "View Item" : "Add Item"}
              </h3>

              <button
                type="button"
                className="inline-flex text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus-visible:ring-4 transition duration-150 ease-linear p-1"
                aria-label="Close"
                onClick={() => {
                  setIsModalOpen(false);
                  formCleanHandler();
                }}
              >
                <span className="material-symbols-rounded">close</span>
              </button>
            </DialogTitle>
            <div className="flex-1 overflow-auto px-3 pb-3">
              <FormItems
                edit={edit}
                view={view}
                formCleanHandler={formCleanHandler}
                isLoading={isLoading}
                isError={isError}
                errors={errors}
                isLoadingUpdate={isLoadingUpdate}
                isLoadingPost={isLoadingPost}
                register={register}
                handleSubmit={handleSubmit}
                submitHandler={submitHandler}
                setIsModalOpen={setIsModalOpen}
                watch={watch}
                error={error}
                nextSequenceNumber={data && data.nextSequenceNumber}
                branch={getBranchName && getBranchName.data}
                group={getItemGroup && getItemGroup.data}
                category={getCategory && getCategory.data}
                uom={getUom && getUom.data}
                hsn={getHSNcode && getHSNcode.data}
                gst={getGST && getGST.data}
              />
            </div>
          </DialogPanel>
        </div>
        <DialogBackdrop className="fixed z-[999] inset-0 bg-black/30" />
      </Dialog>
    </>
  );
};

export default Items;
