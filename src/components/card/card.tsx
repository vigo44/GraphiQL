import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Stack,
} from '@mui/material';

type ComponentProps = {
  img: string;
  name: string;
  description: string;
  chips: string[];
  githubLink: string;
};

function DeveloperCard(props: ComponentProps) {
  return (
    <Card sx={{ width: '250px' }}>
      <CardMedia component="img" alt="photo" height="140" image={props.img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: '5px' }}>
          {props.chips.map((el, key) => (
            <Chip key={key} label={el} variant="outlined" size="small" />
          ))}
        </Stack>
      </CardContent>
      <CardActions>
        <Button component="a" href={props.githubLink} size="small">
          GitHub
        </Button>
      </CardActions>
    </Card>
  );
}

export default DeveloperCard;
