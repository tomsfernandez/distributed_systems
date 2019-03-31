# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: catalog.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='catalog.proto',
  package='',
  syntax='proto3',
  serialized_options=None,
  serialized_pb=_b('\n\rcatalog.proto\"9\n\x07Product\x12\n\n\x02id\x18\x01 \x01(\t\x12\r\n\x05title\x18\x02 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\")\n\x0bProductList\x12\x1a\n\x08products\x18\x01 \x03(\x0b\x32\x08.Product\"\x07\n\x05\x45mpty\"\x1c\n\x0eProductRequest\x12\n\n\x02id\x18\x01 \x01(\t\"\"\n\x13\x42\x61tchProductRequest\x12\x0b\n\x03ids\x18\x01 \x03(\t2\x97\x01\n\x07\x43\x61talog\x12)\n\nGetProduct\x12\x0f.ProductRequest\x1a\x08.Product\"\x00\x12\x37\n\x0fGetProductBatch\x12\x14.BatchProductRequest\x1a\x0c.ProductList\"\x00\x12(\n\x0eGetAllProducts\x12\x06.Empty\x1a\x0c.ProductList\"\x00\x62\x06proto3')
)




_PRODUCT = _descriptor.Descriptor(
  name='Product',
  full_name='Product',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='Product.id', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='title', full_name='Product.title', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='description', full_name='Product.description', index=2,
      number=3, type=9, cpp_type=9, label=1,
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
  serialized_start=17,
  serialized_end=74,
)


_PRODUCTLIST = _descriptor.Descriptor(
  name='ProductList',
  full_name='ProductList',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='products', full_name='ProductList.products', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
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
  serialized_start=76,
  serialized_end=117,
)


_EMPTY = _descriptor.Descriptor(
  name='Empty',
  full_name='Empty',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
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
  serialized_start=119,
  serialized_end=126,
)


_PRODUCTREQUEST = _descriptor.Descriptor(
  name='ProductRequest',
  full_name='ProductRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='ProductRequest.id', index=0,
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
  serialized_start=128,
  serialized_end=156,
)


_BATCHPRODUCTREQUEST = _descriptor.Descriptor(
  name='BatchProductRequest',
  full_name='BatchProductRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='ids', full_name='BatchProductRequest.ids', index=0,
      number=1, type=9, cpp_type=9, label=3,
      has_default_value=False, default_value=[],
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
  serialized_start=158,
  serialized_end=192,
)

_PRODUCTLIST.fields_by_name['products'].message_type = _PRODUCT
DESCRIPTOR.message_types_by_name['Product'] = _PRODUCT
DESCRIPTOR.message_types_by_name['ProductList'] = _PRODUCTLIST
DESCRIPTOR.message_types_by_name['Empty'] = _EMPTY
DESCRIPTOR.message_types_by_name['ProductRequest'] = _PRODUCTREQUEST
DESCRIPTOR.message_types_by_name['BatchProductRequest'] = _BATCHPRODUCTREQUEST
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Product = _reflection.GeneratedProtocolMessageType('Product', (_message.Message,), dict(
  DESCRIPTOR = _PRODUCT,
  __module__ = 'catalog_pb2'
  # @@protoc_insertion_point(class_scope:Product)
  ))
_sym_db.RegisterMessage(Product)

ProductList = _reflection.GeneratedProtocolMessageType('ProductList', (_message.Message,), dict(
  DESCRIPTOR = _PRODUCTLIST,
  __module__ = 'catalog_pb2'
  # @@protoc_insertion_point(class_scope:ProductList)
  ))
_sym_db.RegisterMessage(ProductList)

Empty = _reflection.GeneratedProtocolMessageType('Empty', (_message.Message,), dict(
  DESCRIPTOR = _EMPTY,
  __module__ = 'catalog_pb2'
  # @@protoc_insertion_point(class_scope:Empty)
  ))
_sym_db.RegisterMessage(Empty)

ProductRequest = _reflection.GeneratedProtocolMessageType('ProductRequest', (_message.Message,), dict(
  DESCRIPTOR = _PRODUCTREQUEST,
  __module__ = 'catalog_pb2'
  # @@protoc_insertion_point(class_scope:ProductRequest)
  ))
_sym_db.RegisterMessage(ProductRequest)

BatchProductRequest = _reflection.GeneratedProtocolMessageType('BatchProductRequest', (_message.Message,), dict(
  DESCRIPTOR = _BATCHPRODUCTREQUEST,
  __module__ = 'catalog_pb2'
  # @@protoc_insertion_point(class_scope:BatchProductRequest)
  ))
_sym_db.RegisterMessage(BatchProductRequest)



_CATALOG = _descriptor.ServiceDescriptor(
  name='Catalog',
  full_name='Catalog',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  serialized_start=195,
  serialized_end=346,
  methods=[
  _descriptor.MethodDescriptor(
    name='GetProduct',
    full_name='Catalog.GetProduct',
    index=0,
    containing_service=None,
    input_type=_PRODUCTREQUEST,
    output_type=_PRODUCT,
    serialized_options=None,
  ),
  _descriptor.MethodDescriptor(
    name='GetProductBatch',
    full_name='Catalog.GetProductBatch',
    index=1,
    containing_service=None,
    input_type=_BATCHPRODUCTREQUEST,
    output_type=_PRODUCTLIST,
    serialized_options=None,
  ),
  _descriptor.MethodDescriptor(
    name='GetAllProducts',
    full_name='Catalog.GetAllProducts',
    index=2,
    containing_service=None,
    input_type=_EMPTY,
    output_type=_PRODUCTLIST,
    serialized_options=None,
  ),
])
_sym_db.RegisterServiceDescriptor(_CATALOG)

DESCRIPTOR.services_by_name['Catalog'] = _CATALOG

# @@protoc_insertion_point(module_scope)
