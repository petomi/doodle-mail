import { Box, Text } from '@chakra-ui/react'

const DoodleCard = (props) => {
  return(
    <Box p={5} shadow="md" borderWidth="1px">
      {/* TODO: add viewing drawing and decompression using lzstring, see: https://pieroxy.net/blog/pages/lz-string/guide.html */}
      <Text>{props.message.author} - {props.message.date}</Text>
      <hr/>
      <Text>title: {props.message.title}</Text>
    </Box>
    )
}

export default DoodleCard
