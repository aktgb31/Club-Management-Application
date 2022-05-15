import React from "react";
import {View, Text, Image } from "react-native";
import { view } from "./styling";

export default function ViewAlumniData({ alumni }) {
    return (
        <View style={view.screen}>
            <Text style={view.name}>{alumni.name}</Text>
            <Text style={view.email}>{alumni.email}</Text>

            
            <View style={view.containter2}>

                <View style={view.box7}>
                    <View style={view.boxtop}>
                        <Text style={view.textContent1}>Batch</Text>
                    </View>
                    <View style={view.box6}>
                        <Text style={view.textContent2}>{alumni.batch}</Text>
                    </View>
                </View>
                <View style={view.box7}>
                    <View style={view.boxmid}>
                    <Text style={view.textContent1}>Branch</Text>

                    </View>
                    <View style={view.box6}>
                    <Text style={view.textContent2}>{alumni.branch}</Text>
                        
                    </View>
                </View>
                <View style={view.box7}>
                    <View style={view.boxmid}>
                    <Text style={view.textContent1}>Linkedin</Text>
                    
                        
                    </View>
                    <View style={view.box6}>
                    <Text style={view.textContent2}>{alumni.linkedin}</Text>
                    </View>
                </View>
                <View style={view.box7}>
                    <View style={view.boxmid}>
                    <Text style={view.textContent1}>Company</Text>

                    </View>
                    <View style={view.box6}>
                    <Text style={view.textContent2}>{alumni.currentcompany}</Text>
                        
                    </View>
                </View>
                <View style={view.box7}>
                    <View style={view.boxend}>
                    <Text style={view.textContent1}>Phone</Text>

                    </View>
                    <View style={view.box6}>
                    <Text style={view.textContent2}>{alumni.phone}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
