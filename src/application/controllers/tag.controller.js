import * as tagRepository from '../../infraestructure/repository/tag.repository';
import * as errorUtil from '../../core/src/application/utils/error.util';
import { Tag } from '../../domain/tag.entities';
import { getUserIdFromToken } from '../../core/src/application/utils/auth.util';

export const addTag = async (parent, { addTagInput }, context) => {
    try {
        const userId = context.userId
        if (!userId) { return errorUtil.UNAUTHORIZED() }

        const newTag = Tag()
        newTag.userId = userId
        newTag.value = addTagInput.value
        console.log('will add', newTag);
        // return await tagRepository.addTag(newTag)

        const tagId = await tagRepository.addTag(newTag)
        const result = await tagRepository.getTagsById({ tagId })
        // const tag = { ...result }
        // tag.id = tag._id
        console.log('TAG:', result);
        return result
    } catch (err) {
        return errorUtil.SERVER_ERROR()
    }
}

export const addTag2 = async (parent, { addTagInput }, context) => {
    try {
        const userId = context.userId
        if (!userId) { return errorUtil.UNAUTHORIZED() }
        const newTag = Tag()
        newTag.userId = userId
        newTag.value = addTagInput.value
        console.log('will add', newTag);
        const tagId = await tagRepository.addTag(newTag)
        const result = await tagRepository.getTagsById({ tagId })
        const tag = { ...result }
        tag.id = tag._id
        console.log('TAG:', tag);
        return tag
    } catch (err) {
        return errorUtil.SERVER_ERROR()
    }
}

export const getTagsByUser = async (parent, { getTagsByUser }, context) => {
    try {
        const userId = context.userId
        console.log('USER Id:', userId);
        if (!userId) { return errorUtil.UNAUTHORIZED() }
        const q = await tagRepository.getTagsByUser({ userId })
        // console.log([...q].map(cur => ({ ...cur })));
        // const aa = [...q].map(cur => ({ ...cur, id: cur._id }))
        console.log(q);
        return q
    } catch (err) {
        console.log(err);
        return errorUtil.SERVER_ERROR()
    }
}

export const updateTag = async ({ tagId, updateTagInput }) => {
    try {
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
