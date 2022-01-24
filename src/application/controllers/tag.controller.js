import * as tagRepository from '../../infraestructure/repository/tag.repository';
import * as errorUtil from '../../core/src/application/utils/error.util';
import { Tag } from '../../domain/tag.entities';

export const addTag = async (parent, { addTagInput }, context) => {
    try {
        const userId = context.userId
        if (!userId) { return errorUtil.UNAUTHORIZED() }

        const newTag = Tag()
        newTag.userId = userId
        newTag.value = addTagInput.value
        const tagId = await tagRepository.addTag(newTag)
        return await tagRepository.getTagsById({ tagId })
    } catch (err) {
        return errorUtil.SERVER_ERROR()
    }
}

export const getTagsByUser = async (parent, { getTagsByUser }, context) => {
    try {
        const userId = context.userId
        if (!userId) { return errorUtil.UNAUTHORIZED() }
        return await tagRepository.getTagsByUser({ userId })
    } catch (err) {
        console.log(err);
        return errorUtil.SERVER_ERROR()
    }
}

export const updateTag = async (parent, { tagId, updateTagInput }, context) => {
    try {
        const userId = context.userId
        if (!userId) { return errorUtil.UNAUTHORIZED() }

        const newTag = { ...updateTagInput }
        newTag.updateDate = new Date().toISOString()
        return await tagRepository.updateTag({ tagId, newTag })
    } catch (err) {
        return errorUtil.SERVER_ERROR()
    }
}

// export const removeTag = async ({ tagId }) => {
//     try {
//         return await tagRepository.removeTag({ tagId })
//     } catch (err) {
//         return errorUtil.SERVER_ERROR()
//     }
// }
