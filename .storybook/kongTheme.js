import { create } from '@storybook/theming';
import '../styles.css'
import '../theme.css'

export default create({
  base: 'light',
  brandTitle: 'Kong Storybook',
  brandUrl: 'https://github.com/kong/kongponents',
  brandImage: 'https://konghq.com/wp-content/themes/konghq/assets/img/gradient-logo.svg',
});
