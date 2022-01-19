import { addTag, getTagsByUser, updateTag, removeTag } from '../../../application/controllers/tag.controller';

export const tagResolvers = {
    addTag: addTag,
    getTagsByUser: getTagsByUser,
    updateTag: updateTag,
    // removeTag: removeTag
}