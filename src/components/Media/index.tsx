import NextImage from 'next/image';
import ReactPlayer from 'react-player';
import { MediaFormat } from '../../generated/graphql';
import {
  MediaContainer,
  VideoUploaded,
  ImageUploaded,
  MediaOptions,
  OptionsContainer,
} from '../../styles/components/Media';
import { MenuItem } from '../MenuItem';

export interface MediaProps {
  mediaUrl: string;
  format: MediaFormat;
  width?: number | null;
  height?: number | null;
  editClick: () => void;
  removeClick: () => void;
}

export function Media({
  format,
  mediaUrl,
  width,
  height,
  editClick,
  removeClick,
}: MediaProps): JSX.Element {
  return (
    <MediaContainer>
      {format === MediaFormat.Video && (
        <VideoUploaded>
          <ReactPlayer
            url={mediaUrl}
            controls
            muted={false}
            light
            height="100%"
            width="100%"
          />
          <MediaOptions className="main-media-options">
            <OptionsContainer>
              <MenuItem text="Alterar" onClick={() => editClick()} />
              <MenuItem text="Excluir" onClick={() => removeClick()} />
            </OptionsContainer>
          </MediaOptions>
        </VideoUploaded>
      )}

      {format === MediaFormat.Image && width && height && (
        <ImageUploaded>
          <NextImage
            src={mediaUrl}
            layout="intrinsic"
            width={width}
            height={height}
          />
          <MediaOptions className="main-media-options">
            <OptionsContainer>
              <MenuItem text="Alterar" onClick={() => editClick()} />
              <MenuItem text="Excluir" onClick={() => removeClick()} />
            </OptionsContainer>
          </MediaOptions>
        </ImageUploaded>
      )}
    </MediaContainer>
  );
}
