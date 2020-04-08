import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Tab, Header, Card, Image, Button, Grid } from "semantic-ui-react";

import PhotoUploadWidget from "../../common/PhotoUploadWidget";
import { IProfile } from "../../../models/profile";
import {
  setMainPhoto,
  ISetMainPhoto,
  deletePhoto,
  IDeletePhoto,
} from "../../../actions";
import { IStore } from "../../../reducers";

interface IProps {
  setMainPhoto: ISetMainPhoto;
  deletePhoto: IDeletePhoto;
  profile: IProfile | null;
  loading: boolean;
  uploadingPhoto: boolean;
  isCurrentUser: boolean;
}

const ProfilePhotos: React.FC<IProps> = ({
  setMainPhoto,
  deletePhoto,
  profile,
  loading,
  uploadingPhoto,
  isCurrentUser,
}) => {
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (!uploadingPhoto) {
      setAddPhotoMode(false);
    }
  }, [uploadingPhoto]);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser && (
            <Button
              onClick={() => setAddPhotoMode(!addPhotoMode)}
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile &&
                profile.photos.map((photo) => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {isCurrentUser && (
                      <Button.Group fluid widths={2}>
                        <Button
                          onClick={(e) => {
                            setMainPhoto(photo);
                            setTarget(e.currentTarget.name);
                          }}
                          name={photo.id}
                          disabled={photo.isMain}
                          loading={loading && target === photo.id}
                          basic
                          positive
                          content="Main"
                        />
                        <Button
                          name={photo.id}
                          disabled={photo.isMain}
                          onClick={(e) => {
                            deletePhoto(photo);
                            setDeleteTarget(e.currentTarget.name);
                          }}
                          loading={loading && deleteTarget === photo.id}
                          basic
                          negative
                          icon="trash"
                        />
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

const mapStateToProps = ({
  profile: { profile, loading, uploadingPhoto, isCurrentUser },
}: IStore) => ({
  profile,
  loading,
  uploadingPhoto,
  isCurrentUser,
});

export default connect(mapStateToProps, {
  setMainPhoto,
  deletePhoto,
})(ProfilePhotos);
