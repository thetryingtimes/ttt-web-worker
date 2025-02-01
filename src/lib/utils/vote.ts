import type { VoteRequestProps } from '$lib/api/ballots/vote';

export const formatCountyAndState = (props: VoteRequestProps) =>
  `${props.county}${props.county.toLowerCase().endsWith('county') ? '' : ' County'}, ${props.state}, USA`;
