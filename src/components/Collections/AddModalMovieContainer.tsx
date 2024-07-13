import { styled } from 'goober'
import { $space } from 'remaster-ui'

const AddModalMovieContainer = styled('div')`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: ${$space.gap.xl};
  padding-bottom: ${$space.block.xl};
`

export default AddModalMovieContainer
