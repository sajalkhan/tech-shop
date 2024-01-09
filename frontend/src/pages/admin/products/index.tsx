import { useRef } from 'react';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Row, Col, Modal, Button, FormInstance } from 'antd';
import EditProductForm from '@/components/molecules/editProduct-form';
import ProductCard from '@/components/molecules/productCard';
import { useUpdateProduct } from '@/services/product/useUpdateProduct';
import { useDeleteProduct } from '@/services/product/useDeleteProduct';
import { useGetAllProducts } from '@/services/product/useGetAllProducts';
import { useGetAllCategories } from '@/services/category/useGetAllCategories';
import { useGetSubCategoryByCategoryId } from '@/services/subCategory/useGetSubCategoryById';

const Products = () => {
  const formRef = useRef<FormInstance | null>(null);
  const [productDetails, setProductDetails] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [subCategory, setSubCategory] = useState<[{ value: string; label: string }] | []>([]);

  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: products, refetch: refetchAllProducts } = useGetAllProducts(10);
  const { data: categories, refetch: refetchAllCategories } = useGetAllCategories();
  const { mutate: getSubCategoryById } = useGetSubCategoryByCategoryId();

  useEffect(() => {
    // Check and refetch products
    if (!products) {
      refetchAllProducts();
    }

    // Check and refetch categories
    if (!categories) {
      refetchAllCategories();
    }
  }, [products, categories, refetchAllProducts, refetchAllCategories]);

  const categoryOptions = categories ? categories.map((item: any) => ({ value: item._id, label: item.name })) : [];

  const updateProductDetailsWithCategory = (product: any) => {
    const updatedProduct = {
      ...product,
      category: product.category._id,
      subCategory: product.subCategory.map((item: any) => item._id),
    };

    setProductDetails(updatedProduct);
  };

  const fetchSubCategories = (categoryId: string) => {
    getSubCategoryById(
      { parent: categoryId },
      {
        onSuccess: (data: any) => {
          setSubCategory(data.map((item: any) => ({ value: item._id, label: item.name })));
        },
        onError: (err: any) => {
          toast.error(err.message);
        },
      }
    );
  };

  const handleEdit = async (product: any) => {
    try {
      if (product.category && product.category._id) {
        await fetchSubCategories(product.category._id);
        updateProductDetailsWithCategory(product);
      } else {
        setProductDetails(product);
        setSubCategory([]);
      }
      setOpenEditModal(true);
    } catch (error) {
      console.error('Error in handleEdit:', error);
      toast.error('An error occurred while trying to edit the product.');
    }
  };

  const handleDelete = (id: string) => {
    try {
      deleteProduct(id, {
        onSuccess: () => {
          refetchAllProducts();
          toast.success(`Product Deleted Successfully!`);
        },
        onError: (err: any) => {
          toast.error(err.message);
        },
      });
    } catch (error) {
      console.error('Error in handleDelete:', error);
      toast.error('An error occurred while trying to delete the product.');
    }
  };

  const handleEditProduct = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handleChange = (value: string) => {
    fetchSubCategories(value);
  };

  const handleSubmit = async (data: any) => {
    updateProduct(
      { title: (productDetails && (productDetails as { title?: string }).title) || '', data },
      {
        onSuccess: () => {
          refetchAllProducts();
          setOpenEditModal(false);
          toast.success('Product Updated Successfully!');
        },
        onError: (err: any) => {
          toast.error(err.message);
        },
      }
    );
  };

  return (
    <div className="p-products">
      <h2 className="p-products__heading">All Products</h2>

      {products && (
        <Row gutter={[16, 16]}>
          {products.map((item: any, indx: number) => (
            <Col key={indx} xs={24} sm={12} md={8} lg={6}>
              <ProductCard item={item} handleEdit={handleEdit} handleDelete={handleDelete} userRole="admin" />
            </Col>
          ))}
        </Row>
      )}

      {/* Edit Modal */}
      <Modal
        open={openEditModal}
        title="Edit Product"
        onCancel={() => setOpenEditModal(false)}
        footer={[
          <Button key="back" onClick={() => setOpenEditModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleEditProduct}>
            Submit
          </Button>,
        ]}
      >
        <EditProductForm
          formRef={formRef}
          isGetResponse={false}
          onSubmit={handleSubmit}
          handleChange={handleChange}
          categoryOptions={categoryOptions}
          subCategoryOptions={subCategory}
          productDetails={productDetails}
        />
      </Modal>
    </div>
  );
};

export default Products;
