require_relative '../node_modules/react-native/scripts/react_native_pods'
require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'

platform :ios, '13.0'
install! 'cocoapods', :deterministic_uuids => false

target 'SelaiahRadioMobile' do
  config = use_native_modules!

  # Flags change depending on the env values.
  flags = get_default_flags()

  use_react_native!(
    :path => config[:reactNativePath],
    :hermes_enabled => true,
    :fabric_enabled => flags[:fabric_enabled],
    :flipper_configuration => FlipperConfiguration.enabled,
    :app_path => "#{Pod::Config.instance.installation_root}/.."
  )

  # Firebase
  pod 'Firebase', :modular_headers => true
  pod 'FirebaseCore', :modular_headers => true
  pod 'FirebaseAuth', :modular_headers => true
  pod 'FirebaseMessaging', :modular_headers => true
  pod 'GoogleUtilities', :modular_headers => true

  # React Native Track Player
  pod 'react-native-track-player', :path => '../node_modules/react-native-track-player'

  target 'SelaiahRadioMobileTests' do
    inherit! :complete
  end

  post_install do |installer|
    react_native_post_install(
      installer,
      :mac_catalyst_enabled => false
    )
    __apply_Xcode_12_5_M1_post_install_workaround(installer)

    # Fix for Xcode 14
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '13.0'
      end
    end
  end
end
