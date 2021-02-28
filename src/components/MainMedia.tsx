import NextImage from 'next/image';
import ReactPlayer from 'react-player';
import { MediaFormat } from '../generated/graphql';
import {
  MainMediaContainer,
  VideoUploaded,
  ImageUploaded,
  MainMediaOptions,
  OptionsContainer,
} from '../styles/components/MainMedia';
import { MenuItem } from './MenuItem';

interface MainMediaProps {
  mediaUrl: string;
  format: MediaFormat;
  width?: number;
  height?: number;
  editClick: () => void;
  removeClick: () => void;
}

export default function MainMedia({
  format,
  mediaUrl,
  width,
  height,
  editClick,
  removeClick,
}: MainMediaProps): JSX.Element {
  return (
    <MainMediaContainer>
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
          <MainMediaOptions className="main-media-options">
            <OptionsContainer>
              <MenuItem text="Alterar" onClick={() => editClick()} />
              <MenuItem text="Excluir" onClick={() => removeClick()} />
            </OptionsContainer>
          </MainMediaOptions>
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
          <MainMediaOptions className="main-media-options">
            <OptionsContainer>
              <MenuItem text="Alterar" onClick={() => editClick()} />
              <MenuItem text="Excluir" onClick={() => removeClick()} />
            </OptionsContainer>
          </MainMediaOptions>
        </ImageUploaded>
      )}
    </MainMediaContainer>
  );
}
