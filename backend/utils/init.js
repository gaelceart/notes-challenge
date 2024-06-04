import * as entities from '../constants/entities.js'
import { addConstraints } from '../constants/constraints.js'

export default function init () {
  entities.load()
  addConstraints()
}
