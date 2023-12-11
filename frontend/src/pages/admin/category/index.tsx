import toast from 'react-hot-toast';
import { useState, useEffect, useRef } from 'react';
import { Divider, List, Space, Modal, Button, Input, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '@/components/molecules/category-form';
import { useAddCategory } from '@/services/category/useAddCategory';
import { useEditCategory } from '@/services/category/useEditCategory';
import { useGetAllCategories } from '@/services/category/useGetAllCategories';
import { useDeleteCategory } from '@/services/category/useAddCategory copy';

const Category = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [editItem, setEditItem] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [openEditModal, setEditModal] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  const { mutate: addCategory } = useAddCategory();
  const { mutate: editCategory } = useEditCategory();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { data: categories, refetch: refetchAllCategories } = useGetAllCategories();
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<any>(null);

  useEffect(() => {
    !categories && refetchAllCategories();
  }, [categories, refetchAllCategories]);

  const handleSubmit = async (data: string) => {
    setResponse(false);

    await addCategory(data, {
      onSuccess: () => {
        setResponse(true);
        setIsLoading(false);
        refetchAllCategories();
        toast.success('Category Added Successfully!');
      },
      onError: (err: any) => {
        setIsLoading(false);
        toast.error(err.message);
      },
    });
  };

  const handleEdit = (name: string) => {
    setEditModal(true);
    setCategoryName('');
    setEditItem(name);
  };

  const handleEditCategory = () => {
    setIsLoadingEdit(true);

    editCategory(
      { slug: editItem, name: categoryName },
      {
        onSuccess: () => {
          setResponse(true);
          setIsLoadingEdit(false);
          setEditModal(false);
          refetchAllCategories();
          toast.success('Category successfully Updated!');
        },
        onError: (err: any) => {
          toast.error(err.message);
          setIsLoadingEdit(false);
        },
      }
    );
  };

  const handleDelete = (slug: string) => {
    deleteCategory(slug, {
      onSuccess: () => {
        refetchAllCategories();
        toast.success('Category Deleted Successfully!');
      },
      onError: (err: any) => {
        toast.error(err.message);
      },
    });
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    inputRef.current?.focus();
  };

  const filteredCategories = categories
    ? categories.filter((item: any) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    : [];

  return (
    <div className="p-category">
      <Input.Search
        ref={inputRef}
        placeholder="Search.."
        style={{ width: '30rem', float: 'right' }}
        onSearch={handleSearch}
        onChange={e => handleSearch(e.target.value)}
      />

      <Divider>Create Category</Divider>

      <CategoryForm
        isLoading={isLoading}
        onSubmit={handleSubmit}
        isGetResponse={response}
        setIsLoading={setIsLoading}
      />

      {filteredCategories && (
        <List
          dataSource={filteredCategories}
          renderItem={(item: any) => (
            <List.Item>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <span>{item.name}</span>
                <div>
                  <EditOutlined onClick={() => handleEdit(item.slug)} style={{ color: 'blue', marginRight: '20px' }} />

                  <Popconfirm
                    title="Delete the item"
                    placement="topRight"
                    description="Are you sure to delete this category?"
                    onConfirm={() => handleDelete(item.slug)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined style={{ color: 'red' }} />
                  </Popconfirm>
                </div>
              </Space>
            </List.Item>
          )}
        />
      )}

      <Modal
        open={openEditModal}
        title={`Edit ${editItem}`}
        onOk={handleEditCategory}
        onCancel={() => setEditModal(false)}
        footer={[
          <Button key="back" onClick={() => setEditModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={isLoadingEdit} onClick={handleEditCategory}>
            Submit
          </Button>,
        ]}
      >
        <Input
          value={categoryName}
          placeholder="Please Enter category name"
          onChange={e => setCategoryName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Category;
