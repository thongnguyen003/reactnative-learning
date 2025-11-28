import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export  type ItemProps = {
    itemIndex: number,
    items: {id: number,name: string, price: number, image: ImageSourcePropType }[],
    classProp ?: StyleProp<ViewStyle>
}