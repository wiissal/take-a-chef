const fs = require('fs');
const path = require('path');

// Postman collection structure
const postmanCollection = {
  info: {
    name: "Take-a-Chef API",
    description: "Complete API collection for Take-a-Chef platform - Private Chef Booking System",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  auth: {
    type: "bearer",
    bearer: [
      {
        key: "token",
        value: "{{jwt_token}}",
        type: "string"
      }
    ]
  },
  variable: [
    {
      key: "base_url",
      value: "http://localhost:3000/api",
      type: "string"
    },
    {
      key: "jwt_token",
      value: "",
      type: "string"
    }
  ],
  item: [
    {
      name: "Authentication",
      item: [
        {
          name: "Register User",
          request: {
            method: "POST",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "Test User",
                email: "test@example.com",
                password: "password123",
                role: "customer"
              }, null, 2)
            },
            url: {
              raw: "{{base_url}}/auth/register",
              host: ["{{base_url}}"],
              path: ["auth", "register"]
            }
          },
          response: []
        },
        {
          name: "Login User",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "if (pm.response.code === 200) {",
                  "    var jsonData = pm.response.json();",
                  "    pm.environment.set('jwt_token', jsonData.data.token);",
                  "    pm.collectionVariables.set('jwt_token', jsonData.data.token);",
                  "    console.log('✅ JWT Token saved to collection variables');",
                  "}"
                ],
                type: "text/javascript"
              }
            }
          ],
          request: {
            method: "POST",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                email: "customer1@takeachef.com",
                password: "password123"
              }, null, 2)
            },
            url: {
              raw: "{{base_url}}/auth/login",
              host: ["{{base_url}}"],
              path: ["auth", "login"]
            }
          },
          response: []
        },
        {
          name: "Get Current User",
          request: {
            method: "GET",
            header: [],
            url: {
              raw: "{{base_url}}/auth/me",
              host: ["{{base_url}}"],
              path: ["auth", "me"]
            },
            auth: {
              type: "bearer",
              bearer: [
                {
                  key: "token",
                  value: "{{jwt_token}}",
                  type: "string"
                }
              ]
            }
          },
          response: []
        }
      ]
    },
    {
      name: "Chefs",
      item: [
        {
          name: "Get All Chefs",
          request: {
            method: "GET",
            header: [],
            url: {
              raw: "{{base_url}}/chefs",
              host: ["{{base_url}}"],
              path: ["chefs"]
            }
          },
          response: []
        },
        {
          name: "Get Chef by ID",
          request: {
            method: "GET",
            header: [],
            url: {
              raw: "{{base_url}}/chefs/1",
              host: ["{{base_url}}"],
              path: ["chefs", "1"]
            }
          },
          response: []
        },
        {
          name: "Get Chef Dishes",
          request: {
            method: "GET",
            header: [],
            url: {
              raw: "{{base_url}}/chefs/1/dishes",
              host: ["{{base_url}}"],
              path: ["chefs", "1", "dishes"]
            }
          },
          response: []
        },
        {
          name: "Get Chef Reviews",
          request: {
            method: "GET",
            header: [],
            url: {
              raw: "{{base_url}}/chefs/1/reviews",
              host: ["{{base_url}}"],
              path: ["chefs", "1", "reviews"]
            }
          },
          response: []
        }
      ]
    },
    {
      name: "Bookings",
      item: [
        {
          name: "Create Booking",
          request: {
            method: "POST",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                chef_id: 1,
                booking_date: "2026-02-15",
                number_of_guests: 4,
                preferences: "No nuts, vegetarian options preferred"
              }, null, 2)
            },
            url: {
              raw: "{{base_url}}/bookings",
              host: ["{{base_url}}"],
              path: ["bookings"]
            },
            auth: {
              type: "bearer",
              bearer: [
                {
                  key: "token",
                  value: "{{jwt_token}}",
                  type: "string"
                }
              ]
            }
          },
          response: []
        },
        {
          name: "Get User Bookings",
          request: {
            method: "GET",
            header: [],
            url: {
              raw: "{{base_url}}/bookings",
              host: ["{{base_url}}"],
              path: ["bookings"]
            },
            auth: {
              type: "bearer",
              bearer: [
                {
                  key: "token",
                  value: "{{jwt_token}}",
                  type: "string"
                }
              ]
            }
          },
          response: []
        },
        {
          name: "Get Booking by ID",
          request: {
            method: "GET",
            header: [],
            url: {
              raw: "{{base_url}}/bookings/1",
              host: ["{{base_url}}"],
              path: ["bookings", "1"]
            },
            auth: {
              type: "bearer",
              bearer: [
                {
                  key: "token",
                  value: "{{jwt_token}}",
                  type: "string"
                }
              ]
            }
          },
          response: []
        },
        {
          name: "Update Booking Status",
          request: {
            method: "PUT",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                status: "confirmed"
              }, null, 2)
            },
            url: {
              raw: "{{base_url}}/bookings/1",
              host: ["{{base_url}}"],
              path: ["bookings", "1"]
            },
            auth: {
              type: "bearer",
              bearer: [
                {
                  key: "token",
                  value: "{{jwt_token}}",
                  type: "string"
                }
              ]
            }
          },
          response: []
        }
      ]
    },
    {
      name: "Users",
      item: [
        {
          name: "Get User Profile",
          request: {
            method: "GET",
            header: [],
            url: {
              raw: "{{base_url}}/users/profile",
              host: ["{{base_url}}"],
              path: ["users", "profile"]
            },
            auth: {
              type: "bearer",
              bearer: [
                {
                  key: "token",
                  value: "{{jwt_token}}",
                  type: "string"
                }
              ]
            }
          },
          response: []
        },
        {
          name: "Change Password",
          request: {
            method: "PUT",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                currentPassword: "password123",
                newPassword: "newpassword123"
              }, null, 2)
            },
            url: {
              raw: "{{base_url}}/users/change-password",
              host: ["{{base_url}}"],
              path: ["users", "change-password"]
            },
            auth: {
              type: "bearer",
              bearer: [
                {
                  key: "token",
                  value: "{{jwt_token}}",
                  type: "string"
                }
              ]
            }
          },
          response: []
        }
      ]
    },
    {
      name: "Reviews",
      item: [
        {
          name: "Create Review",
          request: {
            method: "POST",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                booking_id: 1,
                rating: 5,
                comment: "Amazing chef! The food was incredible and the service was perfect."
              }, null, 2)
            },
            url: {
              raw: "{{base_url}}/reviews",
              host: ["{{base_url}}"],
              path: ["reviews"]
            },
            auth: {
              type: "bearer",
              bearer: [
                {
                  key: "token",
                  value: "{{jwt_token}}",
                  type: "string"
                }
              ]
            }
          },
          response: []
        }
      ]
    }
  ]
};

// Create scripts directory if it doesn't exist
const scriptsDir = path.join(__dirname);
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

// Save to file
const outputPath = path.join(__dirname, '../postman-collection.json');
fs.writeFileSync(outputPath, JSON.stringify(postmanCollection, null, 2));

console.log('✅ Postman collection generated successfully!');
console.log(`📁 Location: ${outputPath}`);
console.log('\n📮 To import into Postman:');
console.log('1. Open Postman application');
console.log('2. Click "Import" button (top left)');
console.log('3. Select the file: backend/postman-collection.json');
console.log('4. Collection will load with all endpoints!');
console.log('\n🔑 Usage:');
console.log('1. Run "Login User" request first');
console.log('2. JWT token will auto-save to collection variables');
console.log('3. All other requests will use the token automatically');
console.log('\n✅ Done!');