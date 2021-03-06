import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {SettingsPresenter} from "../../Presenter/SettingsPresenter";
import {SettingsView} from "../../View/SettingsView";
import {style} from './style';
import {DefaultProps} from "../../Config/DefaultProps";
import {DefaultState} from "../../Config/DefaultState";
import {SettingsTitle} from "../../Component/SettingsTitle";
import {SettingsSwitch} from "../../Component/SettingsSwitch";
import {AppContainer} from "../../Component/AppContainer";
import {SettingsButton} from "../../Component/SettingsButton";
import {COLORS} from "../../Navigation/routeName";
import {Component} from "../../Config/DITypes";
import {bind, inject} from "mvp-di";

export default class Settings extends React.Component<DefaultProps, DefaultState> implements SettingsView {

  @inject
  private presenter!: SettingsPresenter;

  public getClassName() {
    return Component.SETTINGS
  }

  @bind
  toggleDarkTheme(value: boolean): void {
    const {setDarkThemeOn, setDarkThemeOff} = this.props.screenProps.themeStore;
    value ? setDarkThemeOn() : setDarkThemeOff();
  }

  @bind
  next(): void {
    this.props.navigation.navigate(COLORS);
  }

  render(): ReactNode {
    const {theme} = this.props.screenProps.themeStore;
    return (
      <AppContainer theme={theme}>
        <SettingsTitle title={'APPEARANCE'} theme={theme} />
        <View style={style.settingsItemWrapper}>
          <SettingsSwitch title={'Dark theme'} theme={theme} onValueChange={this.toggleDarkTheme} />
          <SettingsButton title={'Colors'} theme={theme} onPress={this.next} />
        </View>
        <View style={style.margin} />
      </AppContainer>
    )
  }
}
