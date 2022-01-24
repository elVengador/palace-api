import * as tagController from '../../../application/controllers/tag.controller';

export const tagMutationResolver = {
    addTag: tagController.addTag,
    // addTag2: tagController.addTag2,
    updateTag: tagController.updateTag
}

export const tagQueryResolver = {
    getTagsByUser: tagController.getTagsByUser
}