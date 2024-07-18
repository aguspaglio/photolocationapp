import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/types';
import { StackNavigationProp } from '@react-navigation/stack';

type PhotoScreenRouteProp = RouteProp<RootStackParamList, 'Photo'>;
type Navigationprop = StackNavigationProp<RootStackParamList, 'Photo'>;


export type PhotoScreenProps = {
    route: PhotoScreenRouteProp;
    navigation: Navigationprop;
};
