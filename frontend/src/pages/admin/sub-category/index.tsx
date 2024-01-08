import toast from 'react-hot-toast';
import { useState, useEffect, useRef } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Divider, List, Space, Modal, Button, Input, Select, Popconfirm } from 'antd';
import CategoryForm from '@/components/molecules/category-form';
import { useEditSubCategory } from '@/services/subCategory/useEditSubCategory';
import { useDeleteSubCategory } from '@/services/subCategory/useDeleteSubCategory';
import { useGetAllCategories } from '@/services/category/useGetAllCategories';
import { useAddSubCategory } from '@/services/subCategory/useAddSubCategory';
import { useGetAllSubCategories } from '@/services/subCategory/useGetAllCategories';
import { useGetSubCategoryByCategoryId } from '@/services/subCategory/useGetSubCategoryById';

const SubCategory = () => {
  const [editItem, setEditItem] = useState('');
  const [response, setResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [openEditModal, setEditModal] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const inputRef = useRef<any>(null);
  const { mutate: editSubCategory } = useEditSubCategory();
  const { mutate: deleteSubCategory } = useDeleteSubCategory();
  const { mutate: addSubCategory } = useAddSubCategory();
  const { mutate: getSubCategoryById } = useGetSubCategoryByCategoryId();
  const { data: categories, refetch: refetchAllCategories } = useGetAllCategories();
  const { data: subCategories, refetch: refetchAllSubCategories } = useGetAllSubCategories();

  useEffect(() => {
    !categories && refetchAllCategories();
    !subCategories && refetchAllSubCategories();
    setFilteredSubCategories(
      subCategories
        ? subCategories.filter((item: any) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
        : []
    );
  }, [categories, refetchAllCategories, subCategories, refetchAllSubCategories, searchValue]);

  const categoryOptions = categories
    ? [
        { value: 'all', label: 'All Category' },
        ...categories.map((item: any) => ({ value: item._id, label: item.name })),
      ]
    : [];

  const handleSubmit = async ({ name }: any) => {
    setResponse(false);

    await addSubCategory(
      { name, parent: categoryId },
      {
        onSuccess: () => {
          setResponse(true);
          setIsLoading(false);
          refetchAllSubCategories();
          toast.success('SubCategory Added Successfully!');
        },
        onError: (err: any) => {
          setIsLoading(false);
          toast.error(err.message);
        },
      }
    );
  };

  const handleChange = async (value: string) => {
    setCategoryId(value);

    await getSubCategoryById(
      { parent: value },
      {
        onSuccess: (data: any) => {
          setFilteredSubCategories(data);
        },
        onError: (err: any) => {
          toast.error(err.message);
        },
      }
    );
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    inputRef.current?.focus();
  };

  const handleEdit = (name: string) => {
    setEditModal(true);
    setCategoryName('');
    setEditItem(name);
  };

  const handleEditSubCategory = () => {
    setIsLoadingEdit(true);

    editSubCategory(
      { slug: editItem, name: categoryName },
      {
        onSuccess: () => {
          setResponse(true);
          setIsLoadingEdit(false);
          setEditModal(false);
          refetchAllSubCategories();
          toast.success('SubCategory successfully Updated!');
        },
        onError: (err: any) => {
          toast.error(err.message);
          setIsLoadingEdit(false);
        },
      }
    );
  };

  const handleDelete = (slug: string) => {
    deleteSubCategory(slug, {
      onSuccess: () => {
        refetchAllSubCategories();
        toast.success(`${slug} Deleted Successfully!`);
      },
      onError: (err: any) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <div className="p-subCategory">
      <Input.Search
        ref={inputRef}
        placeholder="Search.."
        style={{ width: '30rem', float: 'right' }}
        onSearch={handleSearch}
        onChange={e => handleSearch(e.target.value)}
      />

      <Divider>Create Sub Category</Divider>

      <Select
        style={{ width: '40rem' }}
        placeholder="Select category"
        onChange={handleChange}
        options={categoryOptions}
        defaultValue="all"
      />

      <CategoryForm
        isLoading={isLoading}
        onSubmit={handleSubmit}
        isGetResponse={response}
        setIsLoading={setIsLoading}
        placeholder="Please Enter SubCategory Name"
      />

      {filteredSubCategories && (
        <List
          dataSource={filteredSubCategories}
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
        onOk={handleEditSubCategory}
        onCancel={() => setEditModal(false)}
        footer={[
          <Button key="back" onClick={() => setEditModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={isLoadingEdit} onClick={handleEditSubCategory}>
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

export default SubCategory;
