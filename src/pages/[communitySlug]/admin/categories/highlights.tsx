/* eslint-disable no-underscore-dangle */
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import {
  DraggableList,
  DraggableItemProps,
} from '../../../../components/DraggableList';
import {
  CommunityTag,
  InputWithTagSuggestion,
} from '../../../../components/InputWithTagSuggestion';
import { AdminPageTemplate } from '../../../../components/templates/AdminPageTemplate';
import {
  useCommunityAdminHighlightedTagsQuery,
  useUpdateCommunityHighlightTagsMutation,
} from '../../../../generated/graphql';
import { useSnackbar } from '../../../../hooks/useSnackbar';
import {
  HighlightCategoriesSection,
  HighlightCategoriesSelection,
  HighlightedCategoriesListContainer,
} from '../../../../styles/pages/AdminHighlightCategories';
import { withApollo } from '../../../../utils/withApollo';

type OrderedTag = {
  order: number;
  tag: CommunityTag;
};

function HighlightCategories(): JSX.Element {
  const [orderedTags, setOrderedTags] = useState<OrderedTag[]>([]);

  const router = useRouter();
  const { addSnackbar } = useSnackbar();

  const { communitySlug } = router.query as { communitySlug: string };

  const { data: community, loading } = useCommunityAdminHighlightedTagsQuery({
    variables: {
      slug: communitySlug,
    },
  });
  const [updateTags] = useUpdateCommunityHighlightTagsMutation();

  useEffect(() => {
    community?.community.community?.highlightedTags &&
      setOrderedTags(community?.community.community?.highlightedTags);
  }, [community?.community.community?.highlightedTags]);

  const orderedTagList = useMemo(
    (): DraggableItemProps[] =>
      orderedTags.map(item => ({
        id: item.tag._id,
        text: {
          primary: item.tag.title,
          secondary:
            item.tag.postCount === 1
              ? '1 post publicado'
              : `${item.tag.postCount} posts publicados`,
        },
        index: item.order,
      })),
    [orderedTags],
  );

  const tags = useMemo(
    (): CommunityTag[] => orderedTags.map(item => item.tag),
    [orderedTags],
  );

  async function handleSelectTag(
    tag: CommunityTag,
    index: number,
  ): Promise<void> {
    const newOrderedTags = [...orderedTags, { order: index, tag }];
    const newOrderedTagsIds = newOrderedTags.map(t => ({
      order: t.order,
      tag: t.tag._id,
    }));

    setOrderedTags(newOrderedTags);
    await updateTags({
      variables: {
        id: community?.community.community?._id,
        highlightedTags: newOrderedTagsIds,
      },
    });

    addSnackbar({
      message: 'Categoria adicionada com sucesso',
    });
  }

  async function handleUpdateHighlightedTags(
    newItems: DraggableItemProps[],
  ): Promise<void> {
    const newTags: OrderedTag[] = newItems.map(item => ({
      order: item.index,
      tag: {
        _id: item.id,
        title: item.text.primary,
        postCount: Number(item.text.secondary?.split(' ')[0]),
      },
    }));

    const newTagsIds = newTags.map(t => ({
      order: t.order,
      tag: t.tag._id,
    }));

    setOrderedTags(newTags);

    if (community?.community.community?.highlightedTags) {
      await updateTags({
        variables: {
          id: community?.community.community?._id,
          highlightedTags: newTagsIds,
        },
      });

      addSnackbar({
        message: 'Categorias em destaque atualizadas com sucesso',
      });
    }
  }

  if (loading) {
    <div />;
  }

  return (
    <AdminPageTemplate
      communitySlug={communitySlug}
      communityTitle={community?.community.community?.title || 'Headshare'}
      communityAuthor={`${community?.community.community?.creator.name} ${
        community?.community.community?.creator.surname
          ? community?.community.community?.creator.surname
          : ''
      }`}
      pageTitle="Categorias"
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
      tabs={[
        {
          text: 'Geral',
          active: false,
          url: `/${communitySlug}/admin/configuration`,
        },
        {
          text: 'Destaques',
          active: true,
        },
      ]}
    >
      <HighlightCategoriesSection>
        <h4>
          Selecione as categorias que aparecerão na página inicial da sua
          comunidade
        </h4>

        <HighlightCategoriesSelection>
          <InputWithTagSuggestion
            communitySlug={communitySlug}
            inputLabel="Adicionar"
            inputName="add-tags"
            selectedTags={tags}
            selectTag={handleSelectTag}
          />

          <HighlightedCategoriesListContainer>
            <DraggableList
              draggableItems={orderedTagList}
              setDraggableItems={handleUpdateHighlightedTags}
            />
          </HighlightedCategoriesListContainer>
        </HighlightCategoriesSelection>
      </HighlightCategoriesSection>
    </AdminPageTemplate>
  );
}

export default withApollo({ ssr: false })(HighlightCategories);
