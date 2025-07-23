//* We can't use ssr: false in a server component, and since we don't want to make our page client-sided, we create a separate child client component called IssueFormWrapper, and import it here. (In this particular case, we're not really improving load time since our NewIssuePage only returns our IssueFormWrapper which is a client-sided component, but it's still best practice to do so, in case we'd like to return more info that can be rendered on the server.)

import IssueFormWrapper from "../_components/IssueFormWrapper";

const NewIssuePage = () => {
  return <IssueFormWrapper />;
};

export default NewIssuePage;
