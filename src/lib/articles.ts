export interface Article {
  title: string;
  blurb: string;
  summary: string;
  impact: string;
  voting_allowed: boolean;
  category: string;

  id: string;
  date_published: string;
}

export const TMP_ARTICLES: Article[] = [
  {
    id: '1',
    date_published: '01/28/2025',
    voting_allowed: true,
    category: 'House',
    title: `Rep. Ogles (R-TN) Introduces Constitutional Amendment to Allow Three Presidential Terms`,
    blurb: `The change could reshape American electoral dynamics and presidential power`,
    summary:
      "A new joint resolution introduced in the House of Representatives seeks to amend the Constitution to allow presidents to serve up to three terms in office, modifying the current two-term limit established by the 22nd Amendment. The proposal, introduced by Representative Ogles, would maintain restrictions on consecutive terms by prohibiting someone from seeking an additional term after serving two consecutive terms. It would also preserve existing rules about partial terms, preventing someone who has served more than two years of another president's term from being elected more than twice.",
    impact:
      'This amendment could significantly alter the dynamics of American presidential politics and democracy. On one hand, it could provide voters more flexibility to retain experienced leadership during critical periods, potentially offering greater stability during long-term challenges like economic transitions or international conflicts. However, it also risks further concentrating executive power and could exacerbate political polarization, as presidents might govern with an eye toward securing a third term rather than focusing on their legacy. The restriction on consecutive terms creates an interesting wrinkle that could lead to presidents serving non-consecutive terms with gaps in between, potentially creating policy whiplash as administrations alternate power. Given the difficult threshold for constitutional amendments requiring ratification by three-fourths of state legislatures, this proposal faces significant hurdles to becoming law, but its mere introduction reflects growing debate about executive term limits in modern American democracy.'
  },
  {
    id: '2',
    date_published: '01/28/2025',
    voting_allowed: true,
    category: 'Executive Order',
    title: `Declassification of Records Concerning the Assassinations of President John F. Kennedy, Senator Robert F. Kennedy, and the Reverend Dr. Martin Luther King, Jr.`,
    blurb:
      'Trump orders full release of JFK, RFK, and MLK assassination records within 45 days',
    summary:
      "President Donald Trump signed an executive order on January 23, 2025, mandating the complete declassification and release of all federal government records related to the assassinations of President John F. Kennedy, Senator Robert F. Kennedy, and Rev. Dr. Martin Luther King Jr. The order gives intelligence agencies 15 days to present a plan for releasing JFK assassination records and 45 days for records related to RFK and MLK assassinations, marking a decisive break from previous administrations that had repeatedly delayed full disclosure.\n\nThis sweeping order goes beyond the requirements of the 1992 JFK Records Act, extending declassification to RFK and MLK assassination records that weren't covered by previous legislation. Trump explicitly rejected the national security and privacy justifications that previous presidents, including Biden, had used to maintain certain redactions, stating that transparency and truth for the families and American people outweigh other concerns.",
    impact:
      'This declassification could have profound societal implications, potentially reshaping public understanding of three pivotal moments in American history. If the records contain significant new information about these assassinations, it could lead to a major reassessment of historical narratives, impact public trust in government institutions, and influence contemporary debates about transparency and state power.\n\nHowever, the impact may be limited by several factors. The most sensitive information may have been destroyed or altered decades ago, and the complex nature of historical documents means that new information could be subject to multiple interpretations. Additionally, the 45-day timeline might prove challenging for agencies to meet while ensuring thorough review of all relevant materials.'
  }
];
