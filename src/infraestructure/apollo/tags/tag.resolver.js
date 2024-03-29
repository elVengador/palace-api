import * as tagController from '../../../application/controllers/tag.controller';

export const tagMutationResolver = {
    addTag: tagController.addTag,
    updateTag: tagController.updateTag
}

export const tagQueryResolver = {
    getTagsByUser: tagController.getTagsByUser
}