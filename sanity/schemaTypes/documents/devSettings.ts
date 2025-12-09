import { defineField, defineType } from 'sanity'
import { SettingsIcon } from '../../lib/featherIcons'

/**
 * Dev Settings - Development options
 * Singleton document for development-related settings
 */
export default defineType({
    name: 'devSettings',
    title: 'Developer Opties',
    type: 'document',
    icon: SettingsIcon,
    fields: [
        defineField({
            name: 'showIncompleteNavItems',
            title: 'Toon onvolledige navigatie-items',
            type: 'boolean',
            description: 'Toon navigatie-items zonder URL/slug (handig tijdens development wanneer pagina\'s nog niet klaar zijn)',
            initialValue: false,
        }),
    ],
    preview: {
        prepare: () => ({
            title: 'Developer Opties',
            subtitle: 'Instellingen voor development',
            media: SettingsIcon,
        }),
    },
})
