import * as tagRepository from '../../infraestructure/repository/tag.repository';
import * as errorUtil from '../../core/src/application/utils/error.util';
import { Tag } from '../../domain/tag.entities';
import { getUserIdFromToken } from '../../core/src/application/utils/auth.util';

export const addTag = async ({ addTagInput }, req) => {
    try {
        if (!req.app.get('userId')) { return errorUtil.BAD_REQUEST() }
        const newTag = Tag()
        newTag.userId = getUserIdFromToken(req)
        newTag.value = addTagInput.value
        return await tagRepository.addTag(newTag)
    } catch (err) {
        return errorUtil.SERVER_ERROR()
    }
}

export const getTagsByUser = async ({ userId }) => {
    try {
        return await tagRepository.getTagsByUser({ userId })
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
