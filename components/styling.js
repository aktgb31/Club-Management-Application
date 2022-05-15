import {StyleSheet, View, TextInput, Text } from "react-native";

const styles = StyleSheet.create({
    containter:{
        width: '100%',
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent:'center'
    },
    image: {
        width: 40,
        height: 40,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 1000,
    },
    box:{
        width:'100%',
        padding:7,
    },
    textInputstyling:{
        borderWidth:1,
        margin:8,
        fontSize:16,
        paddingLeft:8,
        backgroundColor:'#d3d3d0',
        borderRadius:10,
        height:40,
        color:'#006EE9'
    },
});

const view=StyleSheet.create({
    screen: {
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 150,
        height: 150,
        borderWidth: 2,
        borderColor: '#9A9A9A',
        borderRadius: 1000,
    },
    name: {
        fontWeight: "bold",
        fontSize: 25,
        padding: 5,
        textTransform: "uppercase",
        color: '#006EE9'
    },
    email: {
        fontSize: 16,
        textDecorationLine: 'underline',
        fontStyle: 'italic',
        color: '#6A6A6A'
    },
    containter: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10,
        marginTop:15
    },
    containter2: {
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginLeft:'5%',
        marginTop:12,
        backgroundColor:'white',
        marginBottom:10,
        borderWidth:1,
        borderColor:'black',
        borderRadius:10
    },
    box1: {
        width:'43%',
        backgroundColor:'#006EE9',
        borderBottomLeftRadius:10,
        borderTopLeftRadius:10,
        paddingLeft:10,
        paddingRight:10
    },
    box2: {
        width:'45%',
        paddingLeft: 10,
        borderWidth:1,
        borderBottomRightRadius:10,
        borderTopRightRadius:10,
        borderColor:'#006EE9'
    },
    box3:{
        width:'90%',
        backgroundColor:'white',
        borderRadius:10,
        textAlign:'center',
        borderWidth:2
    },
    box4:{
        width:'90%',
        backgroundColor:'white',
        marginLeft:'5%',
        marginBottom:10,
        borderRadius:10
    },
    box5: {
        width:'50%',
        borderBottomLeftRadius:8,
        borderTopLeftRadius:5,
        backgroundColor:'#006EE9',
    },
    box6: {
        width:'50%',
    },
    box7:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width:"100%",
    },
    boxtop:{
        width:'50%',
        borderTopLeftRadius:5,
        backgroundColor:'#006EE9',
    },
    boxmid:{
        width:'50%',
        backgroundColor:'#006EE9',
    },
    boxend:{
        width:'50%',
        borderBottomLeftRadius:5,
        backgroundColor:'#006EE9',
    },
    textContent1: {
        color: 'white',
        padding:8,
        textAlign:'center',
        fontWeight:'bold'
    },
    textContent2: {
        color: '#6A6A6A',
        padding:8
    },
    textContent3:{
        color: 'black',
        padding:8,
        fontSize:18,
        marginBottom:'-2%',
        textAlign:'center',
        fontWeight:'bold'
    }
})


export{
    view,
    styles
}