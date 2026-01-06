/**
 * Template configurations for different generation types.
 * Each template defines placeholders, additional fields, and prompt structures.
 */

export const GENERATION_TYPES = {
    TEXT_TO_VIDEO: 'text-to-video',
    IMAGE_TO_VIDEO: 'image-to-video',
    TEXT_TO_IMAGE: 'text-to-image',
    IMAGE_TO_IMAGE: 'image-to-image',
};

export const TEMPLATE_CONFIGS = {
    general: {
        id: 'general',
        name: 'templates.general.name',
        placeholder: 'templates.general.placeholder',
        helperText: 'templates.general.helperText',
        extraFields: []
    },
    marketing: {
        id: 'marketing',
        name: 'templates.marketing.name',
        placeholder: 'templates.marketing.placeholder',
        helperText: 'templates.marketing.helperText',
        extraFields: [
            {
                id: 'ctaText',
                label: 'templates.marketing.ctaLabel',
                placeholder: 'templates.marketing.ctaPlaceholder',
                type: 'text'
            }
        ]
    },
    storytelling: {
        id: 'storytelling',
        name: 'templates.storytelling.name',
        placeholder: 'templates.storytelling.placeholder',
        helperText: 'templates.storytelling.helperText',
        extraFields: [
            {
                id: 'cameraMovement',
                label: 'templates.storytelling.cameraLabel',
                placeholder: 'templates.storytelling.cameraPlaceholder',
                type: 'text'
            }
        ]
    },
    productDemo: {
        id: 'productDemo',
        name: 'templates.productDemo.name',
        placeholder: 'templates.productDemo.placeholder',
        helperText: 'templates.productDemo.helperText',
        extraFields: [
            {
                id: 'brandingColor',
                label: 'templates.productDemo.brandLabel',
                placeholder: 'templates.productDemo.brandPlaceholder',
                type: 'text'
            }
        ]
    }
};

export const getTemplateById = (id) => TEMPLATE_CONFIGS[id] || TEMPLATE_CONFIGS.general;
