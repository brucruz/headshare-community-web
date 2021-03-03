/* eslint-disable no-underscore-dangle */
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { MdClose } from 'react-icons/md';
import Modal from '../../../components/Modal';
import { OptionsMenu } from '../../../components/OptionsMenu';
import { AdminPageTemplate } from '../../../components/templates/AdminPageTemplate';
import {
  useCommunityAdminCategoriesQuery,
  useUpdateCategoryMutation,
  useCreateCommunityTagMutation,
  Tag,
  useDeleteTagMutation,
} from '../../../generated/graphql';
import { useAuth } from '../../../hooks/useAuth';
import {
  AdminCategory,
  AdminCategoryList,
  CategoryCardContainer,
  CategoryCardDescription,
  CategoryCardHeader,
  CategoryCardLink,
  CategoryTitleAndPosts,
  EditCategoryHeaderContainer,
  EditCategoryModalContainer,
  EditCategoryForm,
} from '../../../styles/pages/AdminCategories';
import { withApollo } from '../../../utils/withApollo';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { toErrorMap } from '../../../utils/toErrorMap';
import { ConfirmationModal } from '../../../components/ConfirmationModal';

interface CategoryVariables {
  title: string;
  slug: string;
  description?: string | null;
}

interface CategoryCardProps extends CategoryVariables {
  id: string;
  postCount: number;
  communitySlug: string;
  removeTag?: (id: string) => void;
}

type Categories = ({ __typename?: 'Tag' } & Pick<
  Tag,
  '_id' | 'title' | 'slug' | 'description' | 'postCount'
>)[];

function CategoryCard({
  id,
  title,
  description,
  slug,
  postCount,
  communitySlug,
  removeTag,
}: CategoryCardProps): JSX.Element {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);
  const [confirmationError, setConfirmationError] = useState<
    string | undefined
  >(undefined);
  const [category, setCategory] = useState<CategoryCardProps>({
    id,
    communitySlug,
    postCount,
    slug,
    title,
    description,
  });

  function openConfirmationModal(): void {
    setIsOpenConfirmationModal(true);
  }

  function closeConfirmationModal(): void {
    setIsOpenConfirmationModal(false);
  }

  const handleEditModalOpen = useCallback(() => {
    setIsOpenEditModal(true);
  }, []);

  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteTag] = useDeleteTagMutation();

  async function handleCategoryExclusion(): Promise<void> {
    const { data } = await deleteTag({
      variables: {
        communitySlug,
        tagId: id,
      },
    });

    if (data?.deleteTag.success === false) {
      setConfirmationError('Houve um erro na sua requisição');
    }

    if (data?.deleteTag.success === true) {
      setIsOpenConfirmationModal(false);
      removeTag && removeTag(id);
    }
  }

  const editForm = useFormik<CategoryVariables>({
    initialValues: {
      title: category.title,
      description: category.description,
      slug: category.slug,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Title is required!'),
      slug: Yup.string().required('Slug is required'),
      description: Yup.string(),
    }),
    onSubmit: async (values, { setErrors }) => {
      const response = await updateCategory({
        variables: {
          communitySlug,
          id,
          updateData: {
            title: values.title,
            description: values.description,
            slug: values.slug,
          },
        },
      });

      if (response.data?.updateTag?.errors) {
        setErrors(toErrorMap(response.data?.updateTag?.errors));
      } else if (response.data?.updateTag?.tag) {
        setCategory(oldState => {
          const {
            title: oldTitle,
            slug: oldSlug,
            description: oldDescription,
            ...rest
          } = oldState;

          return {
            title: response.data?.updateTag?.tag?.title || oldTitle,
            description:
              response.data?.updateTag?.tag?.description || oldDescription,
            slug: response.data?.updateTag?.tag?.slug || oldSlug,
            ...rest,
          };
        });

        setIsOpenEditModal(false);
      }
    },
  });

  return (
    <CategoryCardContainer>
      <CategoryCardHeader>
        <CategoryTitleAndPosts>
          <h4>{category.title}</h4>
          <h5>
            {category.postCount === 1
              ? `${category.postCount} post encontrado`
              : `${category.postCount} posts encontrados`}
          </h5>
        </CategoryTitleAndPosts>

        <OptionsMenu
          menuItems={[
            {
              text: 'Visualizar',
              href: `/${category.communitySlug}/category/${category.slug}`,
              selected: false,
              textSize: 'small',
            },
            {
              text: 'Editar',
              selected: false,
              textSize: 'small',
              onClick: handleEditModalOpen,
            },
            {
              text: 'Deletar',
              selected: false,
              textSize: 'small',
              onClick: () => openConfirmationModal(),
            },
          ]}
        />
      </CategoryCardHeader>

      <CategoryCardDescription>
        <h5>Descrição:</h5>

        <p>{category.description}</p>
      </CategoryCardDescription>
      <CategoryCardLink>
        <h5>Link:</h5>

        <p>
          headshare.app/nihongoplus/<strong>{category.slug}</strong>
        </p>
      </CategoryCardLink>

      <Modal isOpen={isOpenEditModal} setIsOpen={handleEditModalOpen}>
        <EditCategoryModalContainer>
          <EditCategoryHeaderContainer>
            <button type="button" onClick={() => setIsOpenEditModal(false)}>
              <MdClose />
            </button>

            <h2>Edição da Categoria</h2>
          </EditCategoryHeaderContainer>

          <EditCategoryForm onSubmit={editForm.handleSubmit}>
            <Input
              id="title"
              name="title"
              label="Título"
              placeholder="Título da categoria"
              value={editForm.values.title}
              onChange={e =>
                editForm.setValues(oldState => {
                  const { title: cardTitle, ...rest } = oldState;

                  return {
                    title: e.target.value,
                    ...rest,
                  };
                })
              }
              error={editForm.touched.title && editForm.errors.title}
            />

            <Input
              id="description"
              name="description"
              label="Descrição"
              placeholder="Descrição da categoria"
              value={editForm.values.description || ''}
              onChange={e =>
                editForm.setValues(oldState => {
                  const { description: cardDescription, ...rest } = oldState;

                  return {
                    description: e.target.value,
                    ...rest,
                  };
                })
              }
              error={
                editForm.touched.description && editForm.errors.description
              }
            />

            <Input
              id="slug"
              name="slug"
              label="Link"
              placeholder="titulo"
              value={editForm.values.slug}
              onChange={e =>
                editForm.setValues(oldState => {
                  const { slug: cardSlug, ...rest } = oldState;

                  return {
                    slug: e.target.value,
                    ...rest,
                  };
                })
              }
              error={editForm.touched.slug && editForm.errors.slug}
            />

            <Button text="Atualizar dados" type="submit" stretch />
          </EditCategoryForm>
        </EditCategoryModalContainer>
      </Modal>

      <ConfirmationModal
        confirmationText={{
          title: 'Tem certeza que quer excluir esta categoria?',
          subtitle: `Você está prestes a excluir a categoria "${title}". Clique em cancelar, caso tenha sido um engano.`,
        }}
        isOpen={isOpenConfirmationModal}
        setIsOpen={closeConfirmationModal}
        confirmationAction={handleCategoryExclusion}
        error={confirmationError}
      />
    </CategoryCardContainer>
  );
}

function AdminCategories(): JSX.Element {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [categories, setCategories] = useState<Categories>([] as Categories);

  const router = useRouter();

  const { communitySlug } = router.query as { communitySlug: string };

  const { loading, data, error } = useCommunityAdminCategoriesQuery({
    variables: {
      slug: communitySlug,
    },
  });

  const { isCreator } = useAuth();
  const [createCategory] = useCreateCommunityTagMutation();

  const createForm = useFormik<CategoryVariables>({
    initialValues: {
      title: '',
      description: '',
      slug: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Title is required!'),
      slug: Yup.string().required('Slug is required'),
      description: Yup.string(),
    }),
    onSubmit: async (values, { setErrors }) => {
      const response = await createCategory({
        variables: {
          communitySlug,
          tagData: {
            title: values.title,
            description: values.description,
            slug: values.slug,
          },
        },
      });

      if (response.data?.createTag?.errors) {
        setErrors(toErrorMap(response.data?.createTag?.errors));
      } else if (response.data?.createTag?.tag) {
        setIsOpenCreateModal(false);

        router.reload();
      }
    },
  });

  function removeCategory(id: string): void {
    setCategories(oldCategories =>
      oldCategories.filter(category => category._id !== id),
    );
  }

  const community = data && data.community && data.community.community;

  useEffect(() => {
    community && setCategories(community.tags);
  }, [community]);

  if (!data && loading) {
    return <div />;
  }

  if ((!loading && error) || !community) {
    return (
      <div>
        {/* <div>you got query failed for some reason</div>
        <div>{error?.message}</div> */}
      </div>
    );
  }

  if (isCreator === false) {
    router.push(`/${communitySlug}`);
  }

  return (
    <AdminPageTemplate
      communitySlug={communitySlug}
      communityTitle={community.title}
      communityAuthor={`${community.creator.name} ${
        community.creator.surname ? community.creator.surname : ''
      }`}
      pageTitle="Categorias"
      topButton={{
        text: 'Criar uma categoria',
        onClick: () => setIsOpenCreateModal(true),
      }}
      sideMenu={[
        {
          title: 'Posts',
          path: `/${communitySlug}/admin/posts`,
        },
        {
          title: 'Categorias',
          selected: true,
          path: `/${communitySlug}/admin/categories`,
        },
        {
          title: 'Configurações',
          path: `/${communitySlug}/admin/configuration`,
        },
      ]}
    >
      <AdminCategoryList>
        {categories.map(tag => (
          <AdminCategory key={tag._id}>
            <CategoryCard
              communitySlug={communitySlug}
              id={tag._id}
              title={tag.title}
              slug={tag.slug}
              description={tag.description}
              postCount={tag.postCount}
              removeTag={removeCategory}
            />
          </AdminCategory>
        ))}
      </AdminCategoryList>

      <Modal
        isOpen={isOpenCreateModal}
        setIsOpen={() => setIsOpenCreateModal(false)}
      >
        <EditCategoryModalContainer>
          <EditCategoryHeaderContainer>
            <button type="button" onClick={() => setIsOpenCreateModal(false)}>
              <MdClose />
            </button>

            <h2>Criar categoria</h2>
          </EditCategoryHeaderContainer>

          <EditCategoryForm onSubmit={createForm.handleSubmit}>
            <Input
              id="title"
              name="title"
              label="Título"
              placeholder="Título da categoria"
              value={createForm.values.title}
              onChange={e =>
                createForm.setValues(oldState => {
                  const { title: cardTitle, ...rest } = oldState;

                  return {
                    title: e.target.value,
                    ...rest,
                  };
                })
              }
              error={createForm.touched.title && createForm.errors.title}
            />

            <Input
              id="description"
              name="description"
              label="Descrição"
              placeholder="Descrição da categoria"
              value={createForm.values.description || ''}
              onChange={e =>
                createForm.setValues(oldState => {
                  const { description: cardDescription, ...rest } = oldState;

                  return {
                    description: e.target.value,
                    ...rest,
                  };
                })
              }
              error={
                createForm.touched.description && createForm.errors.description
              }
            />

            <Input
              id="slug"
              name="slug"
              label="Link"
              placeholder="titulo"
              value={createForm.values.slug}
              onChange={e =>
                createForm.setValues(oldState => {
                  const { slug: cardSlug, ...rest } = oldState;

                  return {
                    slug: e.target.value,
                    ...rest,
                  };
                })
              }
              error={createForm.touched.slug && createForm.errors.slug}
            />

            <Button text="Atualizar dados" type="submit" stretch />
          </EditCategoryForm>
        </EditCategoryModalContainer>
      </Modal>
    </AdminPageTemplate>
  );
}

export default withApollo({ ssr: false })(AdminCategories);
