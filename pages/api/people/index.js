import { people } from '../../../content/people_data'

export default function handler(req, res) {
  res.status(200).json(people)
}