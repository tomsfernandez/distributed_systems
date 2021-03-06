# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: recommendations.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


import empty_pb2 as empty__pb2


DESCRIPTOR = _descriptor.FileDescriptor(
  name='recommendations.proto',
  package='store',
  syntax='proto3',
  serialized_options=None,
  serialized_pb=_b('\n\x15recommendations.proto\x12\x05store\x1a\x0b\x65mpty.proto\"\'\n\x14RecommendUserRequest\x12\x0f\n\x07user_id\x18\x01 \x01(\t2M\n\x0fRecommendations\x12:\n\rRecommendUser\x12\x1b.store.RecommendUserRequest\x1a\x0c.store.Emptyb\x06proto3')
  ,
  dependencies=[empty__pb2.DESCRIPTOR,])




_RECOMMENDUSERREQUEST = _descriptor.Descriptor(
  name='RecommendUserRequest',
  full_name='store.RecommendUserRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='user_id', full_name='store.RecommendUserRequest.user_id', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=45,
  serialized_end=84,
)

DESCRIPTOR.message_types_by_name['RecommendUserRequest'] = _RECOMMENDUSERREQUEST
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

RecommendUserRequest = _reflection.GeneratedProtocolMessageType('RecommendUserRequest', (_message.Message,), dict(
  DESCRIPTOR = _RECOMMENDUSERREQUEST,
  __module__ = 'recommendations_pb2'
  # @@protoc_insertion_point(class_scope:store.RecommendUserRequest)
  ))
_sym_db.RegisterMessage(RecommendUserRequest)



_RECOMMENDATIONS = _descriptor.ServiceDescriptor(
  name='Recommendations',
  full_name='store.Recommendations',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  serialized_start=86,
  serialized_end=163,
  methods=[
  _descriptor.MethodDescriptor(
    name='RecommendUser',
    full_name='store.Recommendations.RecommendUser',
    index=0,
    containing_service=None,
    input_type=_RECOMMENDUSERREQUEST,
    output_type=empty__pb2._EMPTY,
    serialized_options=None,
  ),
])
_sym_db.RegisterServiceDescriptor(_RECOMMENDATIONS)

DESCRIPTOR.services_by_name['Recommendations'] = _RECOMMENDATIONS

# @@protoc_insertion_point(module_scope)
