import type { VoteRequestProps } from '../ballots/vote';

let userConfirmedProps: VoteRequestProps | undefined = $state(undefined);

export const getUserConfirmedProps = (): VoteRequestProps | undefined => {
  return userConfirmedProps;
};

export const setUserConfirmedProps = (props: VoteRequestProps | undefined) => {
  userConfirmedProps = props;
};
