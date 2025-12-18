import { useState } from "react";
import { Input, Select, Button, Checkbox } from "antd";

export default function Profile() {
  const [formData, setFormData] = useState({
    userType: "Admin",
    userId: "PRL00001",
    emailId: "admin@gmail.com",
    emailAsUsername: true,
    firstName: "WBC",
    lastName: "Team",
    middleName: "Jordan",
    language: "English",
    mobile: "9633698541",
    alternateMobile: "9878451263",
    preferredEmail: "jj@primelab.com",
    notificationMethods: [] as string[],
    phoneNumber: "",
    partialResults: false,
    fullResults: true,
  });

  const [editingSections, setEditingSections] = useState({
    aboutYou: false,
    notifications: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNotificationMethodsChange = (checkedValues: string[]) => {
    setFormData({ ...formData, notificationMethods: checkedValues });
  };

  const toggleEdit = (section: "aboutYou" | "notifications") => {
    setEditingSections({
      ...editingSections,
      [section]: !editingSections[section],
    });
  };

  return (
    <div className="">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
        Profile Management
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-300 rounded-lg col-span-1">
          <div className="section-header px-4 sm:px-6 py-3 flex items-center justify-between rounded-t-lg">
            <h2 className="font-semibold text-gray-900 text-base sm:text-lg">
              Account Details
            </h2>
            {!editingSections.aboutYou && (
              <button
                onClick={() => toggleEdit("aboutYou")}
                className="text-primary text-sm font-medium hover:underline"
              >
                [ edit ]
              </button>
            )}
          </div>
          <div className="px-4 pt-2 pb-4 sm:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User ID
                  </label>
                  <Input
                    value={formData.userId}
                    onChange={(e) =>
                      handleInputChange("userId", e.target.value)
                    }
                    disabled={!editingSections.aboutYou}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email ID
                  </label>
                  <Input
                    type="email"
                    value={formData.emailId}
                    onChange={(e) =>
                      handleInputChange("emailId", e.target.value)
                    }
                    disabled={!editingSections.aboutYou}
                  />
                </div>

                <div className="flex items-center mt-6">
                  <Checkbox
                    checked={formData.emailAsUsername}
                    onChange={(e) =>
                      handleInputChange("emailAsUsername", e.target.checked)
                    }
                    disabled={!editingSections.aboutYou}
                  >
                    Email ID as Username
                  </Checkbox>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Type
                  </label>
                  <Select
                    value={formData.userType}
                    onChange={(value) => handleInputChange("userType", value)}
                    className="w-full"
                    disabled={!editingSections.aboutYou}
                    options={[
                      { value: "Admin", label: "Admin" },
                      { value: "User", label: "User" },
                      { value: "Manager", label: "Manager" },
                    ]}
                  />
                </div>
              </div>
            <div className="border-t border-gray-200 my-8" />

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Personal Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    disabled={!editingSections.aboutYou}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    disabled={!editingSections.aboutYou}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Middle Name
                  </label>
                  <Input
                    value={formData.middleName}
                    onChange={(e) =>
                      handleInputChange("middleName", e.target.value)
                    }
                    disabled={!editingSections.aboutYou}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile
                  </label>
                  <Input
                    value={formData.mobile}
                    onChange={(e) =>
                      handleInputChange("mobile", e.target.value)
                    }
                    disabled={!editingSections.aboutYou}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alternate Mobile
                  </label>
                  <Input
                    value={formData.alternateMobile}
                    onChange={(e) =>
                      handleInputChange("alternateMobile", e.target.value)
                    }
                    disabled={!editingSections.aboutYou}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <Select
                    value={formData.language}
                    onChange={(value) => handleInputChange("language", value)}
                    className="w-full"
                    disabled={!editingSections.aboutYou}
                    options={[
                      { value: "English", label: "English" },
                      { value: "Spanish", label: "Spanish" },
                      { value: "French", label: "French" },
                    ]}
                  />
                </div>
              </div>
            </div>

            {editingSections.aboutYou && (
              <div className="flex gap-3 justify-end mt-6">
                <Button onClick={() => toggleEdit("aboutYou")}>Cancel</Button>
                <Button type="primary" className="btn-primary">
                  Update
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {/* Notification Preferences */}
          <div className="bg-white border border-gray-300 rounded-lg col-span-1 md:col-span-2">
            <div className="section-header px-4 sm:px-6 py-3 flex items-center justify-between rounded-t-lg">
              <h2 className="font-semibold text-gray-900 text-base sm:text-lg">
                Notification Preferences
              </h2>
              {!editingSections.notifications && (
                <button
                  onClick={() => toggleEdit("notifications")}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  [ edit ]
                </button>
              )}
            </div>
            <div className="px-4 pt-2 pb-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Notification Methods */}
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Email
                    </label>
                    <Input
                      type="email"
                      value={formData.preferredEmail}
                      onChange={(e) =>
                        handleInputChange("preferredEmail", e.target.value)
                      }
                      disabled={!editingSections.notifications}
                    />
                    <p className="text-xs text-gray-600 mt-2 flex items-start gap-1">
                      <span className="text-blue-500">ⓘ</span>
                      <span>
                        This email is where you will receive{" "}
                        <span className="text-primary font-medium">
                          feature
                        </span>{" "}
                        Notifications. It has no impact on your login
                        information.
                      </span>
                    </p>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number{" "}
                      <span className="text-gray-500 italic text-xs">
                        Optional
                      </span>
                    </label>
                    <Input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                      placeholder="(555) 123-4567"
                      disabled={!editingSections.notifications}
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      For SMS/text notifications
                    </p>
                  </div>
                </div>

                {/* Access Requests */}
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notification Method for Patient Lab Results
                    </label>
                    <Checkbox.Group
                      value={formData.notificationMethods}
                      onChange={handleNotificationMethodsChange}
                      className="flex flex-col gap-2"
                      disabled={!editingSections.notifications}
                    >
                      <Checkbox value="email">Email</Checkbox>
                      <Checkbox value="phone">Phone Call</Checkbox>
                      <Checkbox value="text">Text/SMS</Checkbox>
                    </Checkbox.Group>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Result Notification Preferences
                    </label>
                    <div className="flex flex-col gap-2">
                      <Checkbox
                        checked={formData.partialResults}
                        onChange={(e) =>
                          handleInputChange("partialResults", e.target.checked)
                        }
                        disabled={!editingSections.notifications}
                      >
                        Notify me when partial results are available
                      </Checkbox>
                      <Checkbox
                        checked={formData.fullResults}
                        onChange={(e) =>
                          handleInputChange("fullResults", e.target.checked)
                        }
                        disabled={!editingSections.notifications}
                      >
                        Notify me when full results are available
                      </Checkbox>
                      <Checkbox
                        checked={formData.fullResults}
                        onChange={(e) =>
                          handleInputChange("fullResults", e.target.checked)
                        }
                        disabled={!editingSections.notifications}
                      >
                        Notify me for both
                      </Checkbox>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Partial results may include preliminary lab values while
                      full results include all completed tests.
                    </p>
                  </div>
                </div>
              </div>

              {editingSections.notifications && (
                <div className="flex gap-3 justify-end mt-6">
                  <Button onClick={() => toggleEdit("notifications")}>
                    Cancel
                  </Button>
                  <Button type="primary" className="btn-primary">
                    Update
                  </Button>
                </div>
              )}
            </div>
          </div>
          {/* Multifactor Authentication */}
          <div className="bg-white border border-gray-300 rounded-lg">
            <div className="section-header px-4 sm:px-6 py-3 rounded-t-lg">
              <h2 className="font-semibold text-gray-900 text-base sm:text-lg">
                Multifactor Authentication
              </h2>
            </div>
            <div className="px-4 pt-2 pb-4 sm:px-6">
              <h3 className="font-semibold text-gray-900 mb-3">MFA Security</h3>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                We take your privacy and security seriously. Turn On multifactor
                authentication (MFA) for an added layer of account security.
              </p>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                <strong>Note:</strong> Currently, multifactor authentication is
                available for the web and mobile versions of Primex, but it must
                be enabled from a browser.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button type="primary" className="btn-primary">
                  Turn On Multifactor Authentication
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
