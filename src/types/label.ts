export type Placement = 'auto'
| 'top'
| 'topStart'
| 'topEnd'
| 'left'
| 'leftStart'
| 'leftEnd'
| 'right'
| 'rightStart'
| 'rightEnd'
| 'bottom'
| 'bottomStart'
| 'bottomEnd'

export interface TooltipAttributes {
  label: string
  placement: Placement
  positionFixed: boolean
  maxWidth: string
}
