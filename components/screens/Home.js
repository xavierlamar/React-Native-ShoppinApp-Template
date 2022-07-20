import { Text, View,StatusBar,ScrollView,TouchableOpacity ,Image,StyleSheet} from 'react-native'
import React,{useState,useEffect} from 'react'
import {COLOURS,Items} from '../database/Database'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
 
const Home = ({navigation})=> {

const [products,setProducts] = useState([]);
const [accessory,setAccessory] = useState([]);

useEffect(()=>{
    const unsubscribe = navigation.addListener('focus',()=>{
        getDataFromDB();
    });
    return unsubscribe;
},[navigation]);

// get data from DB
 
const getDataFromDB =()=>{
    let productList = [];
    let accessoryList = [];

    for (let index = 0; index < Items.length; index++) {

        if(Items[index].category == 'product'){
            productList.push(Items[index]);
        }else if (Items[index].category == 'accessory'){
            accessoryList.push(Items[index]);
        }
    } 
    setProducts(productList);
    setAccessory(accessoryList);
};

//create an product reusable card

const ProductCard =({data}) =>{
    return (
        <TouchableOpacity 
        onPress={() => navigation.navigate('ProductInfo', {productID: data.id})}
        style={{
            width:'48%',
            marginVertical:14,
         }}>
            <View style={{  
                width:'100%',
                height:100,
                borderRadius:10,
                backgroundColor:COLOURS.backgroundLight,
                position:'relative',
                justifyContent :'center',
                alignItems:'center',
                marginBottom:8
            }}>
               {
                   data.isOff ? (
                       <View
                       style={{
                           position:'absolute',
                           width:'20%',
                           height:'24%',
                           backgroundColor:COLOURS.green,
                           top:0,
                           left:0,
                           borderBottomRightRadius:10,
                           borderTopLeftRadius:10,
                           alignItems:'center',
                           justifyContent:'center',
                       }}>
                           <Text style={{
                                 fontSize:12,
                                 color:COLOURS.white,
                                 fontWeight:'bold',
                                 letterSpacing:1,
                           }}>{data.offPercentage} %</Text>
                       </View>
                   ): null}
                   <Image 
                   source={data.productImage} 
                   style={{
                       width:'80%',
                       height:'80%',
                       resizeMode:'contain',
                   }} /> 
            </View>
            <Text
          style={{
            fontSize: 12,
            color: COLOURS.black,
            fontWeight: '600',
            marginBottom: 2,
          }}>
          {data.productName}
        </Text>
        {data.category =="accessory" ? (
        data.isAvailable ?(
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.green,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.green,
                }}>
                Available
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.red,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.red,
                }}>
                Unavailable
              </Text>
            </View>
          )

          ): null }

        <Text>{data.productPrice} FCFA</Text>
        
        </TouchableOpacity>
    )
};

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
          <ScrollView showsVerticalScrollIndicator={false}>
              <View
              style={styles.containerL1}>
                   <TouchableOpacity>
                       <Entypo name="shopping-bag" 
                       style={styles.shoppingBag}
                       />
                   </TouchableOpacity >

                   <TouchableOpacity onPress={()=>navigation.navigate('Cart')} >
                       <MaterialCommunityIcons name="cart" 
                       style={styles.cartIcon}
                       />
                   </TouchableOpacity>
              </View>


              
              <View style={{marginBottom:10,padding:16,}}>
                  <Text style={styles.title}>
                      Xi-Ma Shop &amp; Service
                  </Text>
                  <Text style={styles.titleH2}>
                      Audio shop on Rustaveli Ave 57.
                      {'\n'}This shop offers both products and services
                  </Text>
              </View>
              <View  style={{padding:16,  }}>
                  
              <View style={styles.productTitle}>
                  <View style={{ flexDirection:'row',alignItems:'center',}}>
                      <Text style={styles.productText}>
                      Products
                  </Text>
                  <Text style={styles.productNum}>
                      41
                  </Text>
                  </View>
                  <Text style={styles.productSee}>
                      SeeAll
                  </Text>
              </View>
              <View style={styles.productCard}>
                  {products.map(data => {
                      return <ProductCard data={data} key={data.id} />;
                    })}
              </View>
              </View>

              {/* accessory */}

              <View  style={{ padding:16, }}>
                  
              <View style={styles.accessoryTitle}>
                  <View style={{ flexDirection:'row', alignItems:'center',}}>
                      <Text style={styles.accessoryText}>
                      Accessories
                  </Text>
                  <Text style={styles.accessoryNum}>
                      78
                  </Text>
                  </View>
                  <Text style={styles.seeAll}>
                      SeeAll
                  </Text>
              </View>
              <View style={styles.productAccessory}>
                  {accessory.map(data => {
                      return <ProductCard data={data} key={data.id} />;
                    })}
              </View>
              </View>
          </ScrollView>
      </View>
    )
  }

  const styles = StyleSheet.create({
      container: 
        {
            width:'100%',
            height:'100%',
            backgroundColor: COLOURS.white
      },
      containerL1:
        {
            width:'100%',
            flexDirection:'row',
            justifyContent:'space-between',
            padding:16,
        },
        shoppingBag:{
            fontSize:18,
            color:COLOURS.backgrounMedium,
            padding:12,
            borderRadius:10,
            backgroundColor:COLOURS.backgroundLight,
       },
       cartIcon:{
        fontSize:18,
        color:COLOURS.backgrounMedium,
        padding:12,
        borderRadius:10,
        borderWidth:1,
        borderColor:COLOURS.backgroundLight,
       },
       title:{
        fontSize:26,
        color:COLOURS.black,
        fontWeight:'500',
        letterSpacing:1,
        marginBottom:10,
    },
    titleH2:{
        fontSize:14,
        color:COLOURS.black,
        fontWeight:'400',
        letterSpacing:1,
        lineHeight:24
    },
    productTitle:{
        padding:16,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    productText:{
        fontSize:18,
        color:COLOURS.black,
         fontWeight:'500',
         letterSpacing:1,
    },
    productNum:{
        fontSize:18,
        color:COLOURS.black,
         fontWeight:'400',
         letterSpacing:1,
         opacity:0.5,
         marginLeft:10,
    },
      productSee:{
        fontSize:14,
        color:COLOURS.blue,
        fontWeight:'400'
    },
    productCard:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
     },
     accessoryTitle:
     {
        padding:16,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    accessoryText:{
        fontSize:18,
        color:COLOURS.black,
         fontWeight:'500',
         letterSpacing:1,
    },
    accessoryNum:{
        fontSize:18,
        color:COLOURS.black,
         fontWeight:'400',
         letterSpacing:1,
         opacity:0.5,
         marginLeft:10,
    },
    seeAll:{
         fontSize:14,
         color:COLOURS.blue,
         fontWeight:'400'
    },
    productAccessory:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
     },
    


    })
    

export default Home