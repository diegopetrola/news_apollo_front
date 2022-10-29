import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const CreateLink = (props) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ description: "", url: "" });
  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
    onCompleted: () => navigate("/"),
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) => {
              setFormState({ ...formState, description: e.target.value });
            }}
            type="text"
            placeholder="Link description"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) => {
              setFormState({ ...formState, url: e.target.value });
            }}
            type="text"
            placeholder="URL here"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateLink;
