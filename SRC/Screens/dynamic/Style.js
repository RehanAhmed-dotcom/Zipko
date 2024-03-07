import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Colors from '../../Colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        // paddingVertical: wp(24),
    },
    headcoment: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        width: '100%',
        height: '8%',
        // backgroundColor: 'green',
        alignSelf: "center"
    },
    crosstouch: {
        width: wp(6),
        height: wp(6),

    },
    tovieconfirmuch: {
        width: '70%',
        alignSelf: "center",
        height: wp(10),
        backgroundColor: 'transparent',
        flexDirection: 'row',
        marginTop: wp(5),
        alignItems: "center",
        justifyContent: 'space-between',
    },
    extbutton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.black,
    },
    touch: {
        width: '45%',
        height: '90%',
        borderWidth: 1,
        borderColor: Colors.black,
        alignItems: 'center',
        justifyContent: 'center',
    },
    verifiyview1: { marginTop: hp(25), paddingHorizontal: 5, paddingVertical: 10, width: '80%', height: '30%', alignSelf: "center", backgroundColor: Colors.white, borderRadius: 10, position: 'absolute', zIndex: 100 },
    verifiyview2: { marginTop: hp(20), paddingHorizontal: 5, paddingVertical: 10, width: '100%', height: '80%', alignSelf: "center", backgroundColor: Colors.white, borderRadius: 10, position: 'absolute', zIndex: 100 },

    verifiyview: { paddingHorizontal: 5, bottom: wp(30), paddingVertical: 10, width: '80%', height: '12%', backgroundColor: Colors.white, borderRadius: 10, position: 'absolute', zIndex: 100 },
    textcoment: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    touchrec1: {
        width: wp(100),
        height: hp(100),
        alignSelf: 'center',
        // flexDirection: 'row',
        position: 'absolute',
        backgroundColor: Colors.transperentheader,

        alignItems: 'center',
    },
    profilview: {
        backgroundColor: Colors.transperentheader,
        height: hp(15),
        width: '100%',
        paddingHorizontal: wp(2),
        alignItems: "center",
        flexDirection: 'row',

        justifyContent: 'space-between',
    },
    touchrec6: {
        height: wp(42),
        width: wp(92),
        alignSelf: 'center',
        flexDirection: 'row',
        top: wp(11),
        // borderRadius: wp(10),
        position: 'absolute',
        backgroundColor: Colors.transperentheader,
        elevation: 2,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.maincolor,
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowRadius: 1,
        shadowOpacity: 0.5,
    },
    touchrec: {
        width: wp(100),
        height: hp(60),
        justifyContent: 'center',
        backgroundColor: Colors.transperentheader,

        alignItems: 'center',
    },
    imaginner1: {
        width: wp(12),
        height: wp(12),
        left: wp(8),
        tintColor: Colors.white,
    },
    profileview: {
        width: wp(18),
        height: wp(18),
        borderRadius: wp(10),
        marginTop: wp(1),
        marginBottom: wp(1),
        borderWidth: 0,
        borderColor: Colors.red,
        alignItems: 'center',
        justifyContent: 'center',
        // flexDirection: "row",
    },
    counttxt: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    letarrow: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.white,
    },
    proimag1: {
        width: wp(8),
        height: wp(8),
        tintColor: Colors.white,
    },
    touchleft: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(10),
        backgroundColor: Colors.transperentheader,
        position: 'absolute',
        zIndex: 10,

        alignItems: 'center',
        justifyContent: 'center',
    },
});
